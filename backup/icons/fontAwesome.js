import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faCoffee, faAddressBook, faGithub);

const customFaAliases = {
    ...faAliases,
    coffee: faCoffee,
    addressBook: faAddressBook,
    github: faGithub,
};

export { customFaAwesome };
