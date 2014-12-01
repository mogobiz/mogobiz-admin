import grails.util.Environment

// locations to search for config files that get merged into the main config
// config files can either be Java properties files or ConfigSlurper scripts

grails.config.locations = []

println('**************************************************')

if (Environment.isWarDeployed()) {
    if (System.properties["mogobiz.config.location"]) {
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

dataSource {
    dialect = "org.hibernate.dialect.PostgreSQLDialect"
    driverClassName = "org.postgresql.Driver"
    url = "jdbc:postgresql://localhost/mogobiz"
    username = "mogobiz"
    password = "mogobiz"

    pooled = true
    dbCreate = "update"
//    dbCreate = "create-drop"

//    dialect = "org.hibernate.dialect.MySQLDialect"
//    driverClassName = "com.mysql.jdbc.Driver"
//    url = "jdbc:mysql://localhost/mogobiz"

//    dialect = "com.mogobiz.hibernate.OracleDialect"
//    driverClassName = "oracle.jdbc.driver.OracleDriver"
//    url = "jdbc:oracle:thin:@192.168.184.133:1521:orcl"

//    First create a derby database as follow
//    $ cd /Library/Java/JavaVirtualMachines/jdk1.7.0_11.jdk/Contents/Home/db/bin
//    $ ./ij
//      > CONNECT 'jdbc:derby:/Users/hayssams/tmp/db/mogobiz';
//    You are now ready to access the database from grails.
//    user / password should be empty for a default conf

//    dialect = "org.hibernate.dialect.DerbyDialect"
//    driverClassName = "org.apache.derby.jdbc.ClientDriver"
//    url = "jdbc:derby://localhost:1527//Users/hayssams/tmp/db/mogobiz"


    logSql = false
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

// importCountries.cron='59 59 23 31 12 ? 2099' // never fire

importCountries {
    cron = '0 * * * * ?' // every minute
    codes = 'FR,GB,SN'
    dir = "/data/mogopay/import/countries"
}

grails {
    serverURL = "http://mogobiz.ebiznext.com/mogobiz"
    mail {
        from = 'mogobiz@gmail.com'
        host = 'smtp.gmail.com'
        port = 465
        username = 'mogobiz@gmail.com'
        password = 'e-z12B24'
        props = ['mail.smtp.auth'                  : 'true',
                 'mail.smtp.socketFactory.port'    : '465',
                 'mail.smtp.socketFactory.class'   : 'javax.net.ssl.SSLSocketFactory',
                 'mail.smtp.socketFactory.fallback': 'false']
    }
}

// email confirmation
emailConfirmation {
    from = 'mogobiz@gmail.com'
    // 24hr 1000 * 60 * 60 * 24
    maxAge = 86400000
}

mogopay {
    url = 'http://mogopay.ebiznext.com/pay/'
}

application {
    languages = ['fr', 'en', 'de', 'es']
    secret = "1234567890123456"
}



resources {
    path = "/data/mogobiz"
    url = 'http://localhost:8082'
}

impex  {
    path = '/tmp/impex'
}


external {
    authPath = 'http://mogobiz.ebiznext.com/auth'
}

superadmin {
    login = 'admin@mogobiz.com'
    email = 'admin@mogobiz.com'
    password = '00810cf8b94d6fcb9c5de484d3bec4187620b3e2876e59aab90d852fe0f18fb6' // changeit
}

elasticsearch {
    export.cron = '0 * * * * ?'
    serverURL = 'http://localhost:9200'
    shards = 1
    replicas = 1
}


log4j = {
    error 'net.sf.ehcache.hibernate.AbstractEhcacheRegionFactory',
            'grails.util.GrailsUtil',
            'org.codehaus.groovy.grails.commons.spring.ReloadAwareAutowireCapableBeanFactory',
            'org.grails.plugin.platform.events.EventsImpl'

    warn 'org.springframework'

    info 'com.mogobiz'

    appenders {
        file name: 'file', file: 'mogobiz-admin.log'
    }
    root {
        //error stdout:"StackTrace"
        error 'stdout', 'file'
        additivity = false
    }
}

demo = false

// Do not minimize resources
grails.resources.debug = true
grails.resources.mappers.yuicssminify.disable = true
grails.resources.mappers.yuijsminify.disable = true

environments {
    production {
    }

    development {
    }

    test {
        elasticsearch {
            embedded {
                active = true
                settings {
                    path_data = System.getProperty("java.io.tmpdir") + '/data'
                }
            }

        }
    }

//    grails -Dgrails.env=postgresql schema-export
    postgresql {
        dataSource {
            dialect = "org.hibernate.dialect.PostgreSQLDialect"
            driverClassName = "org.postgresql.Driver"
            url = "jdbc:postgresql://localhost/mogobiz"
        }
    }

//    grails -Dgrails.env=mysql schema-export
    mysql {
        dataSource {
            dialect = "org.hibernate.dialect.MySQLDialect"
            driverClassName = "com.mysql.jdbc.Driver"
            url = "jdbc:mysql://localhost/mogobiz"
        }
    }

//    grails -Dgrails.env=oracle schema-export
    oracle {
        dataSource {
            dialect = "com.mogobiz.hibernate.OracleDialect"
            driverClassName = "oracle.jdbc.driver.OracleDriver"
            url = "jdbc:oracle:thin:@192.168.184.133:1521:orcl"
        }
    }

//    grails -Dgrails.env=derby schema-export
    derby {
        //    First create a derby database as follow
        //    $ cd /Library/Java/JavaVirtualMachines/jdk1.7.0_11.jdk/Contents/Home/db/bin
        //    $ ./ij
        //      > CONNECT 'jdbc:derby:/Users/hayssams/tmp/db/mogobiz';
        //    You are now ready to access the database from grails.
        //    user / password should be empty for a default conf
        //    CREATE SEQUENCE mogobiz_sequence3 as BIGINT START WITH -10000000000 INCREMENT BY 1;
        dataSource {
            dialect = "org.hibernate.dialect.DerbyDialect"
            driverClassName = "org.apache.derby.jdbc.ClientDriver"
            url = "jdbc:derby://localhost:1527//Users/hayssams/tmp/db/mogobiz"
        }
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
 __  __                   _     _       __  __
|  \\/  | ___   __ _  ___ | |__ (_)____ |  \\/  | __ _ _ __   __ _  __ _  ___ _ __
| |\\/| |/ _ \\ / _` |/ _ \\| '_ \\| |_  / | |\\/| |/ _` | '_ \\ / _` |/ _` |/ _ \\ '__|
| |  | | (_) | (_| | (_) | |_) | |/ /  | |  | | (_| | | | | (_| | (_| |  __/ |
|_|  |_|\\___/ \\__, |\\___/|_.__/|_/___| |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|
              |___/                                              |___/
"""