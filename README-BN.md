# BD Pay Full User App

আপনার দেওয়া স্ক্রিনশটের layout ধারণা অনুসরণ করে BD Pay-এর নিজস্ব User App starter।

স্ক্রিন:
- Home/Dashboard
- Recharge/Deposit
- Withdraw
- Income
- Share/Referral
- Work/Records
- Profile
- bKash/Nagad selector
- Payment amount + phone + TrxID
- Bottom navigation

## চালানো
Node.js ইনস্টল করে:
1. npm install
2. npx expo start

## বাস্তব bKash/Nagad
এই starter-এ real money payment চালু করা নেই। বৈধ merchant/API access পাওয়ার পর server-side integration করতে হবে।
- API secret APK-তে রাখা যাবে না।
- Payment create server থেকে হবে।
- Provider callback/webhook গ্রহণ করতে হবে।
- Payment verify করে তারপর database ledger-এ balance credit করতে হবে।
- Withdraw-এও server-side rules, verification এবং audit log থাকবে।

## গুরুত্বপূর্ণ
স্ক্রিনশটের কোনো logo/name/content হুবহু কপি করা হয়নি। BD Pay-এর নিজস্ব branding ব্যবহার করা হয়েছে।
কোনো guaranteed profit claim এই starter-এ দেওয়া হয়নি।
