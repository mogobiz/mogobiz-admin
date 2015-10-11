

/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

import javax.servlet.http.HttpServletResponse

class CacheFilters {

    def filters = {
        all(controller:'*', action:'*') {
            before = {
				((HttpServletResponse) response).setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
				((HttpServletResponse) response).setHeader("Pragma", "no-cache");
				((HttpServletResponse) response).setDateHeader('Expires', (new Date(71,0,1)).time )
				
				
            }
            after = { Map model ->

            }
            afterView = { Exception e ->

            }
        }
    }
}
