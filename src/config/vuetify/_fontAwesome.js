import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Adicione aqui todos os ícones necessários
library.add(faCoffee, faAddressBook, faGithub);

const faIcons = {
    coffee: faCoffee,
    addressBook: faAddressBook,
    github: faGithub,
};

export { FontAwesomeIcon, faIcons };
