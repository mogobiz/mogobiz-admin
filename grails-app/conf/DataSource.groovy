/*
 * Copyright (C) 2015 Mogobiz SARL. All rights reserved.
 */

hibernate {
    cache.use_second_level_cache = false
    cache.use_query_cache = false
    cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory' // Hibernate 3
    singleSession = true
}
