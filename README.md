## quickObit
quickObit is an example NextJs web application that allows users to generate custom obituaries using artifical intelligence (AI). Users sign up using Google or Facebook authentication and get access to the dashboard. To create obituaries, users purchase a plan using Stripe (enter test credit card number 4242-4242-4242-4242) which allows up to 3 attempts which is valid for 7 days. The user can then fill out a form with their loved one's information and submit it to OpenAI's API using a custom prompt. Save the obituaries and edit them as needed. Print/save the final obituary as a PDF.

## Known bugs
1. Cannot add images to PDF: images can be uploaded, but I'm not sure yet how to add them to the PDF using react-pdf.
2. Obituary not generated: this web application is hosted on Vercel. Vercel's free plan has a 10 second response timeout. Sometimes OpenAI's API takes longer than 10 seconds to respond. When this happens, the response will not be received in time.
