import grails.util.Environment

// locations to search for config files that get merged into the main config
// config files can either be Java properties files or ConfigSlurper scripts

grails.config.locations = []

println('**************************************************')
if (Environment.isWarDeployed()) {
    if (System.properties["${appName}.config.location"]) {
        grails.config.locations << "file:" + System.properties["mogobiz.config.location"]
    } else if (System.properties["catalina.home"]) {
        def dir = System.properties["catalina.home"]
        def f1 = "${dir}" + File.separator + "conf" + File.separator + "mogobiz" + File.separator + "mogobiz-config.groovy"
        grails.config.locations << "file:${f1}"
    } else {
        println(' ERROR : Configuration file location could not be found ')
    }
} else {
    def dir = System.properties["base.dir"]
    def f1 = "${dir}" + File.separator + "WEB-INF" + File.separator + "conf" + File.separator + "mogobiz-config.groovy"
    grails.config.locations << "file:${f1}"
}
println grails.config.locations
println('**************************************************')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


grails.serverURL = "http://mogobiz.ebiznext.com/iper2010"

dataSource {
	pooled = true
    dialect = "org.hibernate.dialect.PostgreSQLDialect"
    driverClassName = "org.postgresql.Driver"
    url = "jdbc:postgresql://localhost/iper2010"

    // dialect = "org.hibernate.dialect.MySQLDialect"
    // driverClassName = "com.mysql.jdbc.Driver"
    // url = "jdbc:mysql://localhost/iper2010"

//    dialect = "com.mogobiz.hibernate.OracleDialect"
//    driverClassName = "oracle.jdbc.driver.OracleDriver"
//    url = "jdbc:oracle:thin:@192.168.184.133:1521:orcl"


    username = "iper2010"
    password = "iper2010"
    logSql = true
    properties {
        jmxEnabled = true
        initialSize = 5
        maxActive = 50
        minIdle = 5
        maxIdle = 25
        maxWait = 10000
        maxAge = 10 * 60000
        timeBetweenEvictionRunsMillis = 5000
        minEvictableIdleTimeMillis = 60000
        validationQuery = "SELECT 1"
        validationQueryTimeout = 3
        validationInterval = 15000
        testOnBorrow = true
        testWhileIdle = true
        testOnReturn = false
        jdbcInterceptors = "ConnectionState"
        defaultTransactionIsolation = java.sql.Connection.TRANSACTION_READ_COMMITTED
    }
}

// cache
grails.cache.config = {
    cache {
        name 'currencyCache'
        eternal false
        timeToIdleSeconds 86400
        timeToLiveSeconds 86400
        maxElementsInMemory 100
    }
    cache {
        name 'countryCache'
        eternal false
        timeToIdleSeconds 86400
        timeToLiveSeconds 86400
        maxElementsInMemory 100
    }
}

// mail
grails.mail.host = 'smtp.gmail.com'
grails.mail.port = 465
grails.mail.username = 'mogobiz@gmail.com'
grails.mail.password = 'e-z12B24'
grails.mail.props = ['mail.smtp.auth'                  : 'true',
                     'mail.smtp.socketFactory.port'    : '465',
                     'mail.smtp.socketFactory.class'   : 'javax.net.ssl.SSLSocketFactory',
                     'mail.smtp.socketFactory.fallback': 'false']
grails.mail.default.from = 'mogobiz@gmail.com'

// email confirmation
emailConfirmation.from = 'mogobiz@gmail.com'
// 24hr 1000 * 60 * 60 * 24
emailConfirmation.maxAge = 86400000

// 2 years in seconds
cookie.tracking.lifetime = 60 * 60 * 24 * 365 * 2
cookie.tracking.name = "mogobiz_uuid"

user.product.visit.history = 10
crypto.secret = "1234567890"
crypto.algorithm = "Blowfish"


mogopay.url = 'http://mogopay.ebiznext.com/mogopay/'
mogopay.secretKey = "0808cffd-4064-41a7-92e9-d2b6d6a872ef"

partner.languages = ['fr', 'en', 'de', 'es']

uuidData.recycle.cron = '0 0/10 * * * ?'
uuidData.lifetime.cart = 60 * 60 * 24 * 30 // 30j (en secondes)
uuidData.lifetime.product = 60 * 60 * 24 * 30 // 30j (en secondes)
uuidData.lifetime.country = 60 * 60 * 24 * 30 // 30j (en secondes)

application.secret=1234567890123456

rootPath = '/tmp/mogobiz-data'


rootDomain = '.mogobiz.com'
maxSiteSize = 100 * 1000 * 1000 // 100MB is the max size of user site
externalAuthPath = 'http://mogobiz.ebiznext.com/auth'
defaultCompany = 'ebiznext'
resourcesServerURL = "http://mogobiz.ebiznext.com/iper2010"



environments {
    development {
        dataSource {
            dbCreate = "update"
//            dbCreate = "create-drop"
            // datasource development-environment merge-point
        }
        grails.resources.debug = true
        grails.resources.mappers.yuicssminify.disable = true
        grails.resources.mappers.yuijsminify.disable = true
        elasticsearch {
            export.cron = '0 * * * * ?'
            serverURL = 'http://localhost:9200'
            shards = 1
            replicas = 1
            embedded {
                active = true
                settings {
                    path_data = System.getProperty("java.io.tmpdir") + '/data'
                }
            }
        }
        oauth {
            eboutique {
                client_id = 'eboutique'
                client_secret = 'changeit'
                redirect_uri = 'http://mogobiz.ebiznext.com/auth/oauthcallbackIPER'
            }
        }

        sso {
            // define sso uris
        }

    }

    production {
        dataSource {
            dbCreate = "update"
            // datasource production-environment merge-point
        }
        grails.resources.debug = false
        grails.resources.mappers.yuicssminify.disable = false
        grails.resources.mappers.yuijsminify.disable = false

    }
}



log4j = {
    appenders {
        file name: 'file', file: 'mogobiz-admin.log'
    }
    root {
        //error stdout:"StackTrace"
        info 'stdout', 'file'
        additivity = false
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


grails.date.formats = [
        "dd/MM/yyyy HH:mm:ss",
        "dd/MM/yyyy"
];
grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination
grails.mime.file.extensions = true // enables the parsing of file extensions from URLs into the request format
grails.mime.use.accept.header = false
grails.mime.types = [html         : [
        'text/html',
        'application/xhtml+xml'
],
                     xml          : [
                             'text/xml',
                             'application/xml'
                     ],
                     text         : 'text/plain',
                     js           : 'text/javascript',
                     rss          : 'application/rss+xml',
                     atom         : 'application/atom+xml',
                     css          : 'text/css',
                     csv          : 'text/csv',
                     all          : '*/*',
                     json         : [
                             'application/json',
                             'text/json'
                     ],
                     jsonp        : [
                             'application/json',
                             'text/json'
                     ],
                     form         : 'application/x-www-form-urlencoded',
                     multipartForm: 'multipart/form-data'
]
grails.resources.adhoc.patterns = [
        '/images/*',
        '/css/*',
        '/js/*',
        '/plugins/*'
]
// The default codec used to encode data with ${}
grails.views.default.codec = "none" // none, html, base64
grails.views.gsp.encoding = "UTF-8"
grails.converters.encoding = "UTF-8"
//grails.gsp.enable.reload = true
// enable Sitemesh preprocessing of GSP pages
grails.views.gsp.sitemesh.preprocess = true

//default layout to use
// grails.sitemesh.default.layout = "partner"

// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'
// use jquery while using remote tag libraries
grails.views.javascript.library = "jquery"

// Set to false to use the new Grails 1.2 JSONBuilder in the render method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// whether to install the java.util.logging bridge for sl4j. Disable for AppEngine!
grails.logging.jul.usebridge = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []

security.shiro.filter.config = """
[main]
# The 'main' section defines JSecurity-wide configuration.
#
# Session Mode: By default, JSecurity's Session infrastructure in a web environment will use the
# Servlet container's HttpSession.  However, if you need to share session state across client types
# (e.g. Web MVC plus Java Web Start or Flash), or are doing distributed/shared Sessions for
# Single Sign On, HttpSessions aren't good enough.  You'll need to use JSecurity's more powerful
# (and client-agnostic) session management.  You can enable this by uncommenting the following line
# and changing 'http' to 'jsecurity'
#
#securityManager = roles = org.apache.shiro.web.mgt.DefaultWebSecurityManager
#securityManager.sessionMode = http

[filters]
# This section defines the 'pool' of all Filters available to the url path definitions in the [urls] section below.
#
# The following commented values are already provided by JSecurity by default and are immediately usable
# in the [urls] definitions below.  If you like, you may override any values by uncommenting only the lines
# you need to change.
#
# Each Filter is configured based on its functionality and/or protocol.  You should read each
# Filter's JavaDoc to fully understand what each does and how it works as well as how it would
# affect the user experience.
#
# Form-based Authentication filter:
authc = org.apache.shiro.web.filter.authc.FormAuthenticationFilter
authc.loginUrl = /auth/login
authc.usernameParam = username
authc.passwordParam = password
authc.rememberMeParam = rememberMe
#authc.successUrl  = /login.jsp
#authc.failureKeyAttribute = org.apache.shiro.web.filter.authc.FormAuthenticationFilter.DEFAULT_ERROR_KEY_ATTRIBUTE_NAME
anon = org.apache.shiro.web.filter.authc.AnonymousFilter
authcBasic = org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter
authcBasic.applicationName = Mogobiz
# Roles filter: requires the requesting user to have one or more roles for the request to continue.
# If they do not have the specified roles, they are redirected to the specified URL.
roles = org.apache.shiro.web.filter.authz.RolesAuthorizationFilter
#roles.unauthorizedUrl =

[urls]
#anonymous resources
/=anon
/auth/**=anon
/externalAuth/**=anon
/appli_mobile/**=anon
/index=anon
/images/**=anon
/apis/**=anon
/css/**=anon
/js/**=anon
/site/**=anon
/plugins/**=anon
/services/acquisition=anon
/services/utiliserPack=anon
/resource/display/**=anon
/country/**=anon
/geolocalisationService/obtenirCarteOfPack=anon
/geolocalisationService/obtenirCarteOfSale=anon
/geolocalisationService/genererApis=anon
/geolocalisationService/genererMap=anon
/geolocalisationService/calculerAProximite=anon
/geolocalisationService/calculerItineraireGPS=anon
/geolocalisationService/calculerItineraireTag=anon
/utilisation/**=anon
/event/**=anon
/fbevent/**=anon
/fonts/**=anon
/validator=anon
/validator/loginValidator=anon
/FBCredit/callback=anon
/confirm/**=anon
/poi/show=anon
#/store/listCategoriesByCriteria=authcBasic
#/store/index=anon
/store/**=anon
/cart/**=anon
/genericPayment/**=anon
/seller/isEmailNew=anon
/company/isNameNew=anon
/company/initCreateCompany=anon
/company/initDisplayCompany=anon
/companyTaxPolicy/initTaxRateDialogPage=anon
/elasticsearch/**=anon
/admin/**=authc
/partner/**=authc

/api/**=anon
/resources/**=anon

/OAuth/**=anon
/resource/**=anon
/twitter/**=anon

#by default all other resources needed an authentication
/**=authcBasic
"""


jquery {
	sources = 'jquery' // Holds the value where to store jQuery-js files /web-app/js/
	version = '1.7.1' // The jQuery version in use
}

grails {
    views {
        converters { encoding = "UTF-8" }
        sitemesh { preprocess = true }
        // GSP settings
        gsp {
            encoding = 'UTF-8'
            htmlcodec = 'xml' // use xml escaping instead of HTML4 escaping
            codecs {
                expression = 'html' // escapes values inside ${}
                scriptlet = 'html' // escapes output from scriptlets in GSPs
                taglib = 'none' // escapes output from taglibs
                staticparts = 'none' // escapes output from static template parts
            }
        }
        // escapes all not-encoded output at final stage of outputting
        filteringCodecForContentType {
            //'text/html' = 'html'
        }
    }
}

println """
#     #
##   ##   ####    ####    ####   #####      #    ######
# # # #  #    #  #    #  #    #  #    #     #        #
#  #  #  #    #  #       #    #  #####      #       #
#     #  #    #  #  ###  #    #  #    #     #      #
#     #  #    #  #    #  #    #  #    #     #     #
#     #   ####    ####    ####   #####      #    ######
"""