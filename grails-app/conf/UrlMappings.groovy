class UrlMappings {

	static mappings = {

		"/product/$companyCode/$sanitizedUrl"(controller:'sanitizedUrl', action:'getProduct')
		
		"/resource/$companyCode/$sanitizedUrl"(controller:'sanitizedUrl', action:'getResource')

		/**
		 * geolocation services
		 */
		"/geolocalisationService/$action?"(controller:"geolocalisationService", parseRequest:false) {}

		/**
		 * Partner url mappings
		 */
		"/resource/display/$id/$size?"(controller:"resource", parseRequest:false) {
			action = [GET:'display']
		}
		"/resource/$id?"(controller:"resource", parseRequest:true) {
			action = [GET:'show', POST:'save', PUT:'update', DELETE:'delete']
		}
		"/geolocation/$id?"(controller:"geolocation", parseRequest:true) {
			action = [GET:'show', POST:'save', PUT:'update', DELETE:'delete']
		}
		"/poiType/$id?"(controller:"poiType", parseRequest:true) {
			action = [GET:'show', POST:'save', PUT:'update', DELETE:'delete']
		}
        /**
         * Google
         */
        "/google/env/$id?"(controller:"googleEnv", parseRequest:true) {
            action = [GET:'show', POST:'saveOrUpdate', PUT:'saveOrUpdate', DELETE:'delete']
        }
        "/google/categories"(controller:"googleCategory", parseRequest:true) {
            action = [GET:'show']
        }
        "/google/variations"(controller:"googleVariation", parseRequest:true) {
            action = [GET:'show']
        }
        "/google/mappings"(controller:"googleVariationMappings", parseRequest:true) {
            action = [GET:'show', POST:'save', PUT:'update', DELETE:'delete']
        }
        /**
         * OAuth 2
         */
        "/resource/$resource/$sessionToken"(controller:"resource", action:"sso", parseRequest: true){
            constraints {
                //add a validator for $resource from url mapping
                resource(validator: {
                    return !(it in ['sessionToken'])
                })
            }
        }
        /**
		 * Store
		 */
		// "/store/$companyCode?/$action?/$id?"(controller:"store", parseRequest:true) {
		// }
        "/api/store/publish"(controller:"elasticsearch", action:"publish", parseRequest:false)
        "/api/store/$store?/resources/$id/$size?"(controller:"resource", action:"display", parseRequest:false) {
            action = [GET:'display']
        }
        "/api/store/$store?/comments/$commentId?"(controller:"elasticsearch", parseRequest:true) {
                action = [POST:'saveComment', PUT:'updateComment']
        }
        "/api/store/$store?/products/$productId/comments/"(controller:"elasticsearch"){
            action = [GET:'listProductComments']
        }
        "/api/store/$store?/products/$categoryPath**/$sku?"(controller:"elasticsearch", parseRequest:true) {
            action = [GET:'products']
        }
        "/api/store/$store?/$action?/$categoryPath**?/$productId?"(controller:"elasticsearch", parseRequest:true) {
        }

		"/$controller/$action?/$id?"{ constraints { // apply constraints here
			} }

		"/" (view:"/index")

		"500" (view:'/error')
	}
}
