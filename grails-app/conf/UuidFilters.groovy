import com.mogobiz.service.TrackingService;


/**
 * Filtre en charge de la création du cookie de tracking
 */
class UuidFilters {
	
	TrackingService trackingService
	
	def filters = {
		all(controller:'*', action:'*') {
			before = {
				String cookie = trackingService.getTrackingUuid();
				if (cookie == null) {
                    trackingService.createTrackingUuid();
				}
			}
			after = { Map model ->
			}
			afterView = { Exception e ->
			}
		}
	}
}
