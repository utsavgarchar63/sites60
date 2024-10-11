import { NextResponse } from 'next/server'
import type { NextFetchEvent, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt";
export { default } from 'next-auth/middleware'
import {
    verificationRules,
    companyName,
    companyLogo,
} from "./lib/customRules";
const secret = process.env.NEXTAUTH_SECRET;
// This function can be marked `async` if using `await` inside


async function fetchAllowedDomains() {
    // Implement your database query logic here
    // Return an object where keys are domains and values are arrays of accessible pages
    // Example: { 'example1.com': ['/page1', '/page2'], 'example2.com': ['/page3', '/page4'] }
  }
  

export async function middleware(req: NextRequest) {
    try {
        const domain = req.nextUrl.host;
 
        if (domain != "app.sites60.com" && domain != "localhost:3000") {
            let data = await getDomainDetails(domain)
            if (data.allow == false) {
                return NextResponse.redirect(new URL('/notallowed', req.url))
            }
            else {
                // Get linked smartsite key
                // redirect to customerview with key
                let key = data.key
                return NextResponse.redirect(new URL('/smartsite/' + key, req.url))
            }
        }
        else {
            // Check if Token exists
            const token = await getToken({ req, secret });
            let userInfo = {}
            if (token) {
                let data = await getUserDetails(token.sub)
                userInfo = data.userInfo
            }
            let path = req.url
            if (path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/login" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/register" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/forgot-password" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/reset-password")
            // path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/confirm-email")
            {
                //Token exists - check role & redirect accordingly
                if (token) {
                    if (userInfo.role == "owner") {
                        return NextResponse.redirect(new URL('/', req.url))
                    }
                }
            }
            // Path requires authentication
            if (path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/onboard") {
                if (!token) {
                    return NextResponse.redirect(new URL('/login', req.url))
                }
                else {
                    let customRule = verificationRules.filter(e => e.role === userInfo.user_id.role)[0]
                    if (customRule.verify_revoke == true && userInfo.revoked_access == true) {
                        // User Access Revoked
                        return NextResponse.redirect(new URL('/disabled', req.url))
                    }
                    else if (customRule.verify_email == true && userInfo.verified_email == false) {
                        // User Email Not Verified
                        return NextResponse.redirect(new URL('/verify?type=email', req.url))
                    }
                    else if (customRule.verify_phone == true && userInfo.verified_phone == false) {
                        // User Phone Not Verified
                        return NextResponse.redirect(new URL('/verify?type=phone', req.url))
                    }
                    else {
                        return NextResponse.next()
                    }
                }
            }
            else if (path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/disabled") {
                if (!token) {
                    return NextResponse.redirect(new URL('/login', req.url))
                }
                else {
                    let customRule = verificationRules.filter(e => e.role === userInfo.user_id.role)[0]
                    if (customRule.verify_revoke == true && userInfo.revoked_access == false) {
                        // User Access Revoked
                        return NextResponse.redirect(new URL('/', req.url))
                    }
                    else {
                        return NextResponse.next()
                    }
                }
            }
            else if (path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/verify?type=email" || path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/verify?type=phone") {
                if (!token) {
                    return NextResponse.redirect(new URL('/login', req.url))
                }
                else {
                    let customRule = verificationRules.filter(e => e.role === userInfo.user_id.role)[0]
                    if (customRule.verify_revoke == true && userInfo.revoked_access == true) {
                        // User Access Revoked
                        return NextResponse.redirect(new URL('/disabled', req.url))
                    }
                    else {
                        return NextResponse.next()
                    }
                }
            }
            else if (path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/analytics" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/domain" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/profile" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/billing" ||
                path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/edit-smartsite"
            ) {
                //Token exists - check role & redirect accordingly
                if (!token) {
                    return NextResponse.redirect(new URL('/login', req.url))
                }
                else {
                    // Check Onboarding, Email & Phone Verification
                    // let userInfo = data.userInfo
                    let customRule = verificationRules.filter(e => e.role === userInfo.user_id.role)[0]
                    // console.log("customRule>>>>>", customRule);
                    // console.log("userInfo>>>>>", userInfo);
                    if (customRule.verify_revoke == true && userInfo.revoked_access == true) {
                        // User Access Revoked
                        return NextResponse.redirect(new URL('/disabled', req.url))
                    }
                    else if (customRule.verify_email == true && userInfo.verified_email == false) {
                        // User Email Not Verified
                        return NextResponse.redirect(new URL('/verify?type=email', req.url))
                    }
                    else if (customRule.verify_phone == true && userInfo.verified_phone == false) {
                        // User Phone Not Verified
                        return NextResponse.redirect(new URL('/verify?type=phone', req.url))
                    }
                    else if (customRule.verify_onboard == true && userInfo.onboarded == false) {
                        // User Hasn't Onboarded
                        return NextResponse.redirect(new URL('/onboard', req.url))
                    }
                    // else if (userInfo.is_paid_user == false && new Date(userInfo.trial_expires) < new Date())
                    // {
                    //     // Trial Period has Ended
                    //     return NextResponse.redirect(new URL('/billing', req.url))
                    // }
                    else {
                        return NextResponse.next()
                    }
                }
            }
            else if (path == process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/billing") {
                if (!token) {
                    return NextResponse.redirect(new URL('/login', req.url))
                }
                else {
                    return NextResponse.next()
                }
            }
            // else {
            //     return NextResponse.redirect(new URL('/login', req.url))
            // }
        }
    } catch (error) {
        console.log("error>>>>", error);
        return NextResponse.next()
    }
}
function getUserDetails(user_id) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/api/userInfo?user_id=" + user_id);
        const data = await response.json();
        resolve(data)
    })
}
function getDomainDetails(domain) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL_DOCKER + "/api/domainInfo?domain=" + domain);
        const data = await response.json();
        resolve(data)
    })
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/', '/login', '/verify/:path*', '/register', '/forgot-password', '/confirm-email',
        '/onboard', '/billing', '/disabled', '/analytics', '/domain', '/profile', '/edit-smartsite'
    ],
}