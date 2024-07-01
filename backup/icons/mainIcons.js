import { mdiIcons } from './mdiIcons';
import { mdIcons } from './mdIcons';

const customMdiAliases = {
    ...mdiAliases,
    account: mdiIcons.mdiAccount,
};

const customFaAliases = {
    ...faAliases,
    coffee: faCoffee,
    addressBook: faAddressBook,
    github: faGithub,
};

// Adicionando os aliases dos ícones do Google Material Design
const customMdAliases = {
    ...mdAliases,
    home: mdIcons.home,
    settings: mdIcons.settings,
};

export { mdi, fa, md, customMdAliases, customMdiAliases, customFaAliases };
