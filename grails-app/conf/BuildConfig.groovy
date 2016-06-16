grails.servlet.version = "3.0" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.work.dir = "target/work"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
grails.project.war.file = "target/${appName}.war"
grails.project.plugin.includeSource = false

// grails.plugin.location."mogobiz-core" = "../mogobiz-core"
// grails.plugin.location."mogobiz-extensions" = "../mogobiz-extensions"


grails.project.fork = [
        // configure settings for compilation JVM, note that if you alter the Groovy version forked compilation is required
        //compile: [maxMemory: 256, minMemory: 64, debug: false, maxPerm: 256, daemon:true],
        // configure settings for the test-app JVM, uses the daemon by default
        test: [maxMemory: 1500, minMemory: 64, debug: false, maxPerm: 1024, daemon:true],
        // configure settings for the run-app JVM
        run: [maxMemory: 2048, minMemory: 2048, debug: false, maxPerm: 1024, forkReserve:false],
        // configure settings for the run-war JVM
        war: [maxMemory: 2048, minMemory: 2048, debug: false, maxPerm: 1024, forkReserve:false],
        // configure settings for the Console UI JVM
        console: [maxMemory: 2048, minMemory: 2048, debug: true, maxPerm: 1024]
]

grails{
    tomcat{
        jvmArgs = [
                "-server",
                "-XX:MaxPermSize=512m",
                "-XX:MaxNewSize=256m",
                "-XX:NewSize=256m",
                "-Xms2048m",
                "-Xmx2048m",
                "-XX:SurvivorRatio=128",
                "-XX:MaxTenuringThreshold=0",
                "-XX:+UseTLAB",
                "-XX:+UseConcMarkSweepGC",
                "-XX:+CMSClassUnloadingEnabled",
                "-XX:+CMSIncrementalMode",
                "-XX:-UseGCOverheadLimit",
                "-XX:+ExplicitGCInvokesConcurrent"
        ]
    }
}
grails.project.dependency.resolver = "maven" // or ivy

grails.war.resources = {stagingDir ->

    def jarsPluginsToRemove = [
            "$stagingDir/WEB-INF/lib/activation.jar",
            "$stagingDir/WEB-INF/lib/jdom-1.0.jar",
            "$stagingDir/WEB-INF/lib/wsdl4j-1.6.1.jar",
            "$stagingDir/WEB-INF/lib/wss4j-1.5.1.jar",
            "$stagingDir/WEB-INF/lib/wstx-asl-3.2.0.jar",
            "$stagingDir/WEB-INF/lib/XmlSchema-1.1.jar",
            "$stagingDir/WEB-INF/lib/xmlsec-1.3.0.jar"
    ];
    jarsPluginsToRemove.each { delete (file: it) }

    delete(file: "${stagingDir}/WEB-INF/lib/quartz-1.6.1.jar")
    delete (file : "$stagingDir/WEB-INF/lib/slf4j-api-1.6.jar")
    delete (file : "$stagingDir/WEB-INF/lib/slf4j-api-1.5.8.jar")
}
grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
        // uncomment to disable ehcache
        excludes 'ehcache'
    }

    log "warn" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
//    checksums true // Whether to verify checksums on resolve
    //legacyResolve false // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

    repositories {
        //inherits true // Whether to inherit repository definitions from plugins
        grailsPlugins()
        grailsHome()
        mavenLocal()
        grailsCentral()

        // uncomment the below to enable remote dependency resolution
        // from public Mavn repositories
        mavenCentral()
    }

    plugins {
        // plugins for the build system only
        build ':tomcat:7.0.50'
        runtime ':console:1.5.6'


// plugins needed at runtime but not for compilation
        // runtime ':hibernate4:4.3.5.2' // or
        runtime ':hibernate:3.6.10.15' // ':hibernate4:4.3.5.3' for Hibernate 4
//        runtime ':hibernate:3.6.10.14'
        runtime ':database-migration:1.4.0'
//        runtime ':jquery:1.11.0.2'
        compile ":facebook-graph:0.14"
        compile ':platform-core:1.0.0'
        compile ":google-data:0.1.3"
        runtime ":resources:1.2.8"
        compile (":email-confirmation:2.0.8") {
            excludes 'quartz'
        }
        compile ":jquery:1.9.1"
        compile ":jquery-ui:1.8.24"
        compile (":shiro:1.2.1") {
            excludes 'shiro-quartz'
        }
        compile ":mail:1.0.5"
        compile ":quartz:1.0.1"
        compile ':recaptcha:0.6.8'
        compile ":cache-headers:1.1.6"
        compile ":cached-resources:1.0"
//		compile ":zipped-resources:1.0"
//		runtime ":yui-minify-resources:0.1.5"
        compile ":rest:0.8"
        compile ":joda-time:1.4"
        test ':spock:0.7'
        compile ":standalone:1.3"

        compile "com.mogobiz:mogobiz-core:1.1.0-SNAPSHOT"
    }
    dependencies {
        // specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.
        // compile "org.springframework:spring-orm:$springVersion"
        compile ('org.codehaus.groovy.modules.http-builder:http-builder:0.5.2') { excludes "groovy" }
        compile 'com.fasterxml.jackson.core:jackson-core:2.2.3'
        compile 'com.fasterxml.jackson.core:jackson-databind:2.2.3'
        compile group:"org.twitter4j", name:"twitter4j-async", version:"2.2.5"
        compile group:"org.twitter4j", name:"twitter4j-core", version:"2.2.5"
        compile group:"org.twitter4j", name:"twitter4j-media-support", version:"2.2.5"
        compile group:"org.twitter4j", name:"twitter4j-stream", version:"2.2.5"
//        runtime 'mysql:mysql-connector-java:5.1.30'
        runtime "postgresql:postgresql:9.1-901.jdbc4"
//        runtime "com.oracle:ojdbc6:11.2.0.1.0"

        compile 'org.elasticsearch:elasticsearch:1.2.1'
        compile ('org.elasticsearch:elasticsearch-analysis-icu:2.2.0') {
            excludes 'org.elasticsearch:elasticsearch'
        }

        compile 'org.scala-lang:scala-library:2.11.2'

        compile 'com.typesafe.akka:akka-actor_2.11:2.3.12'
        compile 'com.typesafe.akka:akka-stream-experimental_2.11:1.0-M3'

        compile (group:"io.reactivex", name:"rxjava-reactive-streams", version: "1.0.1") {excludes ([ group: 'io.reactivex', name: 'rxjava'])}
        compile ('io.reactivex:rxgroovy:1.0.3') {excludes "groovy-all"}
        compile ('io.reactivex:rxjava:1.0.15')

        runtime 'org.json4s:json4s-native_2.11:3.2.9'
        runtime 'org.json4s:json4s-jackson_2.11:3.2.9'

        runtime 'io.spray:spray-client_2.11:1.3.1'

        //oltu
        compile 'org.apache.oltu.oauth2:org.apache.oltu.oauth2.common:0.31'
        compile 'org.apache.oltu.oauth2:org.apache.oltu.oauth2.authzserver:0.31'
        compile 'org.apache.oltu.oauth2:org.apache.oltu.oauth2.resourceserver:0.31'
        runtime 'org.codehaus.jettison:jettison:1.2'

        compile 'com.restfb:restfb:1.6.7'
        compile 'com.google.zxing:core:1.7'

        compile (group:"com.mogobiz.rivers", name:"mogobiz-common", version:"1.1.0-SNAPSHOT")  {excludes "groovy-all"}
        compile (group:"com.mogobiz.rivers", name:"mogobiz-http-client", version:"1.1.0-SNAPSHOT")  {excludes "groovy-all"}
        compile (group:"com.mogobiz.rivers", name:"mogobiz-cfp", version:"1.1.0-SNAPSHOT")  {excludes "groovy-all"}
        compile (group:"com.mogobiz.rivers", name:"mogobiz-elasticsearch", version:"1.1.0-SNAPSHOT")  {excludes "groovy-all"}
        compile (group:"com.mogobiz.rivers", name:"mogobiz-mirakl", version:"1.1.0-SNAPSHOT")  {excludes "groovy-all"}
        compile (group:"com.mogobiz.rivers", name:"mogobiz-mirakl-flow", version:"1.1.0-SNAPSHOT")  {excludes "groovy-all"}

        compile (group:"com.mogobiz", name:"mogobiz-extensions", version:"1.1.0-SNAPSHOT", classifier:"grails-plugin")  {excludes "mogobiz-core"}

        compile 'org.jsoup:jsoup:1.8.1'

    }
}

grails.project.repos.default = "mogoRepo"
grails.project.repos.mogoRepo.url = "http://art.ebiznext.com/artifactory/libs-release-local"
grails.project.repos.mogoRepo.type = "maven"
grails.project.repos.myRepo.portal = "grailsCentral"

