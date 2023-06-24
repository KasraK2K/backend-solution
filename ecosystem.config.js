//================================================================================================================
//
//  #####   ###    ###   ####         #####   ####   #####    ####  ##    ##   ####  ######  #####  ###    ###
//  ##  ##  ## #  # ##  #    #        ##     ##     ##   ##  ##      ##  ##   ##       ##    ##     ## #  # ##
//  #####   ##  ##  ##     ##         #####  ##     ##   ##   ###     ####     ###     ##    #####  ##  ##  ##
//  ##      ##      ##   ##           ##     ##     ##   ##     ##     ##        ##    ##    ##     ##      ##
//  ##      ##      ##  ######        #####   ####   #####   ####      ##     ####     ##    #####  ##      ##
//
//================================================================================================================

// NOTE: To run typescript file install this `pm2 install typescript`
module.exports = {
  apps: [
    {
      name: `backend.${process.env.NODE_ENV}`,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      script: process.env.NODE_ENV === 'development' ? 'src/server.ts' : 'build/src/server.js',
      autorestart: true,
      watch: process.env.NODE_ENV === 'development',
      time: true,
      instance_var: `backend.${process.env.NODE_ENV}`,
      instances: process.env.NODE_ENV === 'development' ? '1' : 'max',
      exec_mode: 'cluster',

      // default variables
      env: {
        IS_ON_SERVER: true,
      },

      // development environment
      env_development: {
        NODE_ENV: 'development',
        JWT_SECRET: 'QiOjObFkrNmV4FhObFk0SmxkQ0N3UDMTmlNalZ1V',
        ENCRYPTION_SECRET:
          'jVuTFhObFk0SmxkQzFyWlhrNmlNalZ1VEZoT2JGazBTbXhrUXpGeVdsaHJObVa3JObVY0c0luUlNqRmpNbF',
        PORT: '4100',
      },

      // production environment
      env_production: {
        NODE_ENV: 'production',
        JWT_SECRET: 'QiOjObFkrNmV4FhObFk0SmxkQ0N3UDMTmlNalZ1V',
        ENCRYPTION_SECRET:
          'jVuTFhObFk0SmxkQzFyWlhrNmlNalZ1VEZoT2JGazBTbXhrUXpGeVdsaHJObVa3JObVY0c0luUlNqRmpNbF',
        PORT: '4101',
      },
    },
  ],
}
