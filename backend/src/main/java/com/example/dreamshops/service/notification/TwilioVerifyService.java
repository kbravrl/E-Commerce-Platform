package com.example.dreamshops.service.notification;

import com.twilio.Twilio;
import com.twilio.exception.ApiException;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.rest.verify.v2.service.VerificationCheck;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioVerifyService {
    private final String serviceSid;
    public TwilioVerifyService(
            @Value("${twilio.accountSid}") String accountSid,
            @Value("${twilio.authToken}") String authToken,
            @Value("${twilio.verifyServiceSid}") String serviceSid
    ) {
        Twilio.init(accountSid, authToken);
        this.serviceSid = serviceSid;
    }

    public void sendSmsCode(String toE164) {
        // toE164: "+90..." format
        Verification.creator(serviceSid, toE164, "sms").create();
    }

    public boolean checkCode(String toE164, String code) {
        try {
            var res = VerificationCheck.creator(serviceSid)
                    .setTo(toE164)
                    .setCode(code)
                    .create();
            return "approved".equalsIgnoreCase(res.getStatus());
        } catch (ApiException e) {
            return false;
        }
    }
}
