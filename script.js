document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const firstNameField = document.querySelector('#first-name');
  const lastNameField = document.querySelector('#last-name');
  const messageField = document.querySelector('#message');
  const errorMessageContainer = document.querySelector('#error-message');
  const commentListContainer = document.querySelector('#comment-list');

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Vérification des champs vides
    if (
      firstNameField.value.trim() === '' ||
      lastNameField.value.trim() === '' ||
      messageField.value.trim() === ''
    ) {
      errorMessageContainer.style.display = 'block';
      return;
    } else {
      errorMessageContainer.style.display = 'none';
    }

    // Création du nouveau commentaire au format HTML attendu
    const newComment = document.createElement('div');
    newComment.className = 'flex space-x-4 text-sm text-gray-500';
    newComment.innerHTML = `
      <div class="flex-1 py-10 border-t border-gray-200">
        <h3 class="font-medium text-gray-900">${escapeHtml(firstNameField.value)} ${escapeHtml(lastNameField.value)}</h3>
        <div class="prose prose-sm mt-4 max-w-none text-gray-500">
          <p>${escapeHtml(messageField.value)}</p>
        </div>
      </div>
    `;

    // Ajoute le commentaire à la liste
    commentListContainer.appendChild(newComment);

    // Réinitialise les champs
    form.reset();
  });

  // Fonction pour échapper le HTML (sécurité basique XSS)
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
