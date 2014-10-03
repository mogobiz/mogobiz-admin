import com.mogobiz.store.domain.Company
import org.apache.shiro.SecurityUtils

import com.mogobiz.store.customer.StoreSessionData
import com.mogobiz.store.domain.RoleName
import com.mogobiz.store.domain.Seller
import com.mogobiz.store.domain.User

/**
 * @version $Id $
 *
 */
class SecurityFilters {

    static filters = {
        admin(uri: "/admin/**") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.ADMINISTRATOR.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.admin = User.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }

        /**
         * Company acl
         */
        saveCompany(controller: "company", action: "save") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.ADMINISTRATOR.name())
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }

        company(controller: "company", action: "show|update") {
            before = {
                def idCompany = params.id ? params.id : (params['company']?.id ? params['company'].id : Company.findByCode(params.code).id)
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name())) && permission("company:${idCompany}:admin")
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        companyShippingPolicy(controller: "companyShippingPolicy", action: "show|update") {
            before = {
                def idCompany = params.id ? params.id : params['company']?.id
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name())) && permission("company:${idCompany}:admin")
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        companyTaxPolicy(controller: "companyTaxPolicy", action: "show|save|update|delete") {
            before = {
                def idCompany = (params['taxRate']?.company?.id) ? params['taxRate']?.company?.id : params['company']?.id
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name())) && permission("company:${idCompany}:admin")
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        companyPaymentPolicy(controller: "companyPaymentPolicy", action: "show|update") {
            before = {
                def idCompany = params['company']?.id
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name())) && permission("company:${idCompany}:admin")
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        keyGen(controller: "keyGen", action: "generateAPIKey") {
            before = {
                def idCompany = params['company']?.id
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name())) && permission("company:${idCompany}:admin")
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        /**
         * Seller acl
         */
        showSeller(controller: "seller", action: "show") {
            before = {
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name()))
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }

        /**
         * Seller acl
         */
        modifySeller(controller: "seller", action: "save|update|delete") {
            before = {
                def idCompany = (params['company']?.id) ? params['company']?.id : params['seller']?.company?.id
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name())) && permission("company:${idCompany}:admin")
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }

        /**
         * Seller password acl
         */
        sellerPassword(controller: "sellerPassword", action: "resetPassword") {
            before = {
                accessControl(auth: true) {
                    (role(RoleName.ADMINISTRATOR.name()) || role(RoleName.PARTNER.name()))
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }


        partner(controller: "partner", action: "*") {
            before = {
                if (actionName == "register") {
                    return true
                }
                accessControl(auth: true) {
                    role(RoleName.PARTNER.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.seller = Seller.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        resource(controller: "resource", action: "update|save|delete") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.PARTNER.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.seller = Seller.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        product(controller: "product", action: "update|save|delete") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.PARTNER.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.seller = Seller.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        productKoPeriods(controller: "productKoPeriods", action: "show|update|save|delete") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.PARTNER.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.seller = Seller.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        event(controller: "event", action: "update|save|delete") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.PARTNER.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.seller = Seller.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        variation(controller: "variationCombination", action: "update|save|delete") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.PARTNER.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.seller = Seller.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }

        consultation(controller: "consultation", action: "*") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.CLIENT.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.buyer = Buyer.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }
        consultationServices(uri: "/services/consultation") {
            before = {
                accessControl(auth: true) {
                    role(RoleName.CLIENT.name())
                }
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.buyer = Buyer.findByLogin(subject.principal)
                }
            }
            after = { model ->
            }
            afterView = {
            }
        }

        /**
         * Making the User Object Available in the Request
         */
        userInStore(controller: "store|jahia|cart", action: "*") {
            before = {
                if (!session.storeData) {
                    session.storeData = new StoreSessionData()
                }
            }
        }
        userInRequest(controller: "*", action: "*") {
            before = {
                def subject = SecurityUtils.getSubject()
                if (subject && subject?.principal) {
                    request.user = User.findByLogin(subject.principal)
                }
            }
        }
    }

    /*def onNotAuthenticated(subject, controller) {
     if (controller.request.xhr) {
     controller.render(template:"/user/loginForm", model:[message:"user.not.logged.in"])
     }
     else {
     // Redirect to login page.
     controller.flash.message = "user.not.logged.in"
     controller.redirect(uri:'/auth/login')
     }
     }*/
}
