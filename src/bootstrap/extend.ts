//==================================================================================================================================
//
//  ######  ##    ##  #####   #####        ####    #####   ####  ##      #####  #####      ###    ######  ##   #####   ##     ##
//    ##     ##  ##   ##  ##  ##           ##  ##  ##     ##     ##      ##     ##  ##    ## ##     ##    ##  ##   ##  ####   ##
//    ##      ####    #####   #####        ##  ##  #####  ##     ##      #####  #####    ##   ##    ##    ##  ##   ##  ##  ## ##
//    ##       ##     ##      ##           ##  ##  ##     ##     ##      ##     ##  ##   #######    ##    ##  ##   ##  ##    ###
//    ##       ##     ##      #####        ####    #####   ####  ######  #####  ##   ##  ##   ##    ##    ##   #####   ##     ##
//
//==================================================================================================================================

declare namespace Express {
  export interface Request {
    // add custom property like key: string
    process_id: string
  }

  export interface Response {
    // add custom property like key: string
    originalSend: (...args: any[]) => void
  }
}
