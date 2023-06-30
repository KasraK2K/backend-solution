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
      script: process.env.NODE_ENV === 'development' ? 'ts-node' : 'build/server.js',
      args: '-r tsconfig-paths/register src/server.ts',
      autorestart: true,
      watch: process.env.NODE_ENV === 'development',
      time: true,
      instance_var: `backend.${process.env.NODE_ENV}`,
      instances: process.env.NODE_ENV === 'development' ? '1' : 'max',
      exec_mode: 'cluster',
      ignore_watch: ['node_modules', './swagger.json'],
      watch_options: {
        followSymlinks: false,
      },

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
