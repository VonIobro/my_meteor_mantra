import publications from './publications';
import methods from './methods';
import addInitialData from './configs/initial_adds.js';
import accountsConfig from './configs/accounts_config';

publications();
methods();
addInitialData();
accountsConfig();

// uncomment below to enable emails, create file and put in smtp settings:
// /*
import privateCredentials from './configs/private_credentials';
privateCredentials();
// */
