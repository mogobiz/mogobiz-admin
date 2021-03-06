/*
 * Copyright 2004-2005 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import grails.util.BuildScope

/**
 * Gant script that creates a WAR file from a Grails project
 *
 * @author Graeme Rocher
 *
 * @since 0.4
 */

scriptScope = BuildScope.WAR

includeTargets << grailsScript("War")

target (deployMain:'''Creates a WAR archive for deployment onto a Java EE application server.

Examples:
grails deploy
grails prod deploy
''') {
    depends(warMain)
	
    try {
		def dest = grailsHome = Ant.project.properties."environment.CATALINA_HOME" + "/webapps"
		Ant.copy(file:warName, todir:dest)
		 
        event("StatusFinal", ["War deploy in ${dest}"])
    }
    finally {
    }
	
}

setDefaultTarget('deployMain')
