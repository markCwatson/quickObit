## quickObit
quickObit is an example NextJs web application that allows users to generate custom obituaries using artifical intelligence (AI). Users sign up using Google or Facebook authentication and get access to the dashboard. To create obituaries, users purchase a plan using Stripe (enter test credit card number 4242-4242-4242-4242) which allows up to 3 attempts which is valid for 7 days. The user can then fill out a form with their loved one's information and submit it to OpenAI's API using a custom prompt. Save the obituaries and edit them as needed. Print/save the final obituary as a PDF.

## Known bugs
1. Cannot add images to PDF: images can be uploaded, but I'm not sure yet how to add them to the PDF using react-pdf.
2. Obituary not generated: this web application is hosted on Vercel. Vercel's free plan has a 10 second response timeout. Sometimes OpenAI's API takes longer than 10 seconds to respond. When this happens, the response will not be received in time.
3. I am using a free version of PlanetScale to host the database. It goes to sleep after 7 days of inactivity. Therefore, I will be adding a new route used by a dummy Vercel CRON job that runs every 6 days to query the database to try and prevent this. If the database is asleep, you will see an error when being redirected to the dashboard after signing in. I'll try to set up the CRON job and route ASAP.
