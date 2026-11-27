const SUPABASE_URL = 'https://aniqjjhgcjrkaycfvfkk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_3TlEQiqZ7Z2qY7vgYPGYwg_yRQb5lpD';
const REVIEW_TABLE_URL = `${SUPABASE_URL}/rest/v1/reviews`;
let currentAdminCode = '';

const reviewHeaders = () => ({
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    'Content-Type': 'application/json'
});

function renderReviewCard(review, adminMode = false, pending = false) {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.style.cssText = 'text-align:left; margin-bottom:1rem; position:relative;';

    const stars = document.createElement('div');
    stars.className = 'review-stars';
    stars.textContent = '⭐'.repeat(Math.min(5, Math.max(1, Number(review.stars) || 5)));

    const text = document.createElement('p');
    text.className = 'review-text';
    text.textContent = `“${String(review.review_text || '')}”`;

    const author = document.createElement('span');
    author.className = 'review-author';
    author.textContent = `- ${String(review.name || 'Klant')}`;

    card.append(stars, text, author);

    if (adminMode) {
        const actions = document.createElement('div');
        actions.style.cssText = 'display:flex; gap:.5rem; margin-top:.75rem;';
        if (pending) {
            const approve = document.createElement('button');
            approve.type = 'button';
            approve.className = 'btn btn-primary';
            approve.textContent = 'Goedkeuren';
            approve.addEventListener('click', () => updateReview(review.id, 'approve'));
            actions.append(approve);
        }
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'btn btn-outline';
        remove.textContent = 'Verwijderen';
        remove.addEventListener('click', () => updateReview(review.id, 'delete'));
        actions.append(remove);
        card.append(actions);
    }
    return card;
}

function showEmpty(container, message) {
    const text = document.createElement('p');
    text.className = 'no-reviews';
    text.textContent = message;
    container.replaceChildren(text);
}

async function loadReviews() {
    const recentContainer = document.getElementById('recentReviewsContainer');
    const modalContainer = document.getElementById('reviewsModalList');
    if (!recentContainer || !modalContainer) return;

    try {
        const response = await fetch(`${REVIEW_TABLE_URL}?select=id,name,stars,review_text,created_at&approved=eq.true&order=created_at.desc&limit=50`, {
            headers: reviewHeaders()
        });
        if (!response.ok) throw new Error('Reviews konden niet worden geladen.');
        const reviews = await response.json();
        if (!reviews.length) {
            showEmpty(recentContainer, 'Er zijn nog geen reviews.');
            showEmpty(modalContainer, 'Er zijn nog geen reviews.');
            return;
        }
        recentContainer.replaceChildren(...reviews.slice(0, 3).map(review => renderReviewCard(review)));
        modalContainer.replaceChildren(...reviews.map(review => renderReviewCard(review)));
    } catch (error) {
        showEmpty(recentContainer, 'Reviews laden lukt nu niet. Probeer het later opnieuw.');
        showEmpty(modalContainer, 'Reviews laden lukt nu niet. Probeer het later opnieuw.');
    }
}

function setReviewStatus(message, isError = false) {
    const status = document.getElementById('reviewSubmissionStatus');
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? '#b91c1c' : '#15803d';
}

async function submitReview(event) {
    event.preventDefault();
    const nameInput = document.getElementById('reviewName');
    const starsInput = document.getElementById('reviewStars');
    const textInput = document.getElementById('reviewText');
    const submitButton = event.currentTarget.querySelector('button[type="submit"]');
    const name = nameInput.value.trim();
    const reviewText = textInput.value.trim();
    const stars = Number(starsInput.value);

    if (name.length < 1 || name.length > 80 || reviewText.length < 1 || reviewText.length > 1000 || stars < 1 || stars > 5) {
        setReviewStatus('Controleer je naam, review en aantal sterren.', true);
        return;
    }

    submitButton.disabled = true;
    setReviewStatus('Review versturen…');
    try {
        const response = await fetch(REVIEW_TABLE_URL, {
            method: 'POST',
            headers: { ...reviewHeaders(), Prefer: 'return=minimal' },
            body: JSON.stringify({ name, stars, review_text: reviewText, approved: true })
        });
        if (!response.ok) throw new Error('Review versturen is mislukt.');
        event.currentTarget.reset();
        setReviewStatus('Bedankt! Je review staat meteen op de website.');
        await loadReviews();
    } catch (error) {
        setReviewStatus('Versturen lukte niet. Probeer het later opnieuw.', true);
    } finally {
        submitButton.disabled = false;
    }
}

function setAdminStatus(message, isError = false) {
    const status = document.getElementById('reviewAdminStatus');
    if (!status) return;
    status.textContent = message;
    status.style.color = isError ? '#b91c1c' : '#15803d';
}

async function verifyAdminCode() {
    const codeInput = document.getElementById('reviewAdminCode');
    const code = codeInput.value.trim();
    if (code.length < 13 || code.length > 64) {
        setAdminStatus('Vul de beheercode in.', true);
        return;
    }

    const button = document.getElementById('verifyReviewCodeBtn');
    button.disabled = true;
    setAdminStatus('Code controleren…');
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/review_admin_list`, {
            method: 'POST',
            headers: reviewHeaders(),
            body: JSON.stringify({ p_code: code })
        });
        const reviews = await response.json();
        if (!response.ok || !Array.isArray(reviews)) throw new Error('Ongeldige beheercode.');
        currentAdminCode = code;
        codeInput.value = '';
        await renderAdminReviews(reviews);
    } catch (error) {
        currentAdminCode = '';
        setAdminStatus('De code klopt niet of Supabase is nog niet ingesteld.', true);
    } finally {
        button.disabled = false;
    }
}

async function renderAdminReviews(reviews = null) {
    const panel = document.getElementById('reviewAdminPanel');
    const adminList = document.getElementById('pendingReviewsList');
    const controls = document.getElementById('reviewAdminControls');
    const logoutButton = document.getElementById('logoutReviewAdminBtn');
    if (panel) panel.hidden = false;
    if (controls) controls.hidden = Boolean(currentAdminCode);
    if (logoutButton) logoutButton.style.display = currentAdminCode ? 'inline-flex' : 'none';
    if (adminList) showEmpty(adminList, 'Reviews ophalen…');

    try {
        if (!currentAdminCode) throw new Error('Log in met je beheercode.');
        if (!reviews) {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/review_admin_list`, {
                method: 'POST',
                headers: reviewHeaders(),
                body: JSON.stringify({ p_code: currentAdminCode })
            });
            reviews = await response.json();
            if (!response.ok || !Array.isArray(reviews)) throw new Error('Geen beheerrechten.');
        }

        const pending = reviews.filter(review => !review.approved);
        const approved = reviews.filter(review => review.approved);
        if (adminList) {
            if (!pending.length) showEmpty(adminList, 'Nieuwe reviews verschijnen direct. Verwijderen kan in de lijst hieronder.');
            else adminList.replaceChildren(...pending.map(review => renderReviewCard(review, true, true)));
        }
        const approvedContainer = document.getElementById('reviewsModalList');
        if (approvedContainer) {
            if (!approved.length) showEmpty(approvedContainer, 'Er zijn nog geen reviews.');
            else approvedContainer.replaceChildren(...approved.map(review => renderReviewCard(review, true, false)));
        }
        const recentContainer = document.getElementById('recentReviewsContainer');
        if (recentContainer) {
            if (!approved.length) showEmpty(recentContainer, 'Er zijn nog geen reviews.');
            else recentContainer.replaceChildren(...approved.slice(0, 3).map(review => renderReviewCard(review)));
        }
        setAdminStatus('Beheer ingeschakeld.');
    } catch (error) {
        currentAdminCode = '';
        if (controls) controls.hidden = false;
        if (logoutButton) logoutButton.style.display = 'none';
        setAdminStatus('Beheer kon niet worden geladen. Controleer de beheercode en database-instelling.', true);
    }
}

async function updateReview(id, action) {
    if (!currentAdminCode) return;
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/review_admin_action`, {
            method: 'POST',
            headers: reviewHeaders(),
            body: JSON.stringify({ p_review_id: id, p_code: currentAdminCode, p_action: action })
        });
        if (!response.ok) throw new Error();
        await renderAdminReviews();
    } catch (error) {
        setAdminStatus('Review aanpassen is mislukt. Controleer de code en probeer opnieuw.', true);
    }
}

function initReviewSystem() {
    const form = document.getElementById('reviewForm');
    const adminButton = document.getElementById('adminReviewBtn');
    const panel = document.getElementById('reviewAdminPanel');
    const codeInput = document.getElementById('reviewAdminCode');

    if (form) form.addEventListener('submit', submitReview);
    if (adminButton && panel) {
        adminButton.addEventListener('click', () => {
            panel.hidden = !panel.hidden;
            if (!panel.hidden) {
                if (currentAdminCode) renderAdminReviews();
            }
        });
    }
    document.getElementById('verifyReviewCodeBtn')?.addEventListener('click', verifyAdminCode);
    document.getElementById('logoutReviewAdminBtn')?.addEventListener('click', () => {
        currentAdminCode = '';
        if (panel) panel.hidden = true;
        const controls = document.getElementById('reviewAdminControls');
        const logoutButton = document.getElementById('logoutReviewAdminBtn');
        if (controls) controls.hidden = false;
        if (logoutButton) logoutButton.style.display = 'none';
        loadReviews();
    });
    codeInput?.addEventListener('keydown', event => {
        if (event.key === 'Enter') verifyAdminCode();
    });
    loadReviews();
    // Update reviews for visitors who already have the page open.
    window.setInterval(() => {
        if (currentAdminCode) renderAdminReviews();
        else loadReviews();
    }, 15000);
}

document.addEventListener('DOMContentLoaded', initReviewSystem);
