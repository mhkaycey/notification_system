// all templates

import { Template } from 'shared/types';

export const templates: Record<string, Template> = {
  welcome: {
    id: 'welcome',
    name: 'Welcome email',
    subject: `Welcome to {{app_name}}, {{user_name}}`,
    content: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Welcome Email</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 6px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
            line-height: 1.5;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Welcome to Our Community 🎉</h2>
          <p>Hi {{user_name}},</p>
          <p>We’re thrilled to have you join us! You’re now part of a growing community of innovators and dreamers.</p>
          <p>To get started, click the button below:</p>
          <a href="#" class="button">Get Started</a>
          <p>If you have any questions, just reply to this email — we’re always happy to help.</p>
          <p>Cheers,<br>The {{app_name}} Team</p>
          <div class="footer">
            © 2025 {{app_name}}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  },
  application: {
    id: 'application',
    name: 'Application email',
    subject: `{{user_name}} Application`,
    content: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Application Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 6px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
            line-height: 1.5;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Application Received ✅</h2>
          <p>Hi {{user_name}},</p>
          <p>Thank you for applying for the <strong>[Position/Program Name]</strong> at <strong>{{company_name}}</strong>.</p>
          <p>We’ve successfully received your application and our team will review it carefully. If your profile matches our criteria, we’ll reach out to you for the next steps.</p>
          <p>You can check your application status anytime by clicking the button below:</p>
          <a href="#" class="button">View Application</a>
          <p>If you have any questions, feel free to reply to this email — we’ll be glad to assist.</p>
          <p>Best regards,<br>The {{company_name}} Team</p>
          <div class="footer">
            © 2025 {{company_name}}. All rights reserved.
          </div>
        </div>
      </body>
      </html>

    `,
  },
  offer: {
    id: 'offer',
    name: 'Offer email',
    subject: `Offer for, {{user_name}}!`,
    content: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Offer Letter</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 6px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
          }
          h2 {
            color: #333;
          }
          p {
            color: #555;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 15px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Congratulations! 🎉</h2>
          <p>Hi {{user_name}},</p>
          <p>We’re thrilled to inform you that you’ve been selected for the position of <strong>{{position}}</strong> at <strong>{{company_name}}</strong>.</p>
          <p>Your skills, experience, and passion stood out during the selection process, and we’re excited to have you join our team.</p>
          <p>Please review your official offer letter by clicking the button below:</p>
          <a href="#" class="button">View Offer Letter</a>
          <p>We kindly ask that you confirm your acceptance by replying to this email or completing the confirmation form linked above by <strong>{{deadline}}</strong>.</p>
          <p>If you have any questions or need clarification, feel free to reach out — we’ll be happy to assist.</p>
          <p>Welcome aboard!<br>The {{company_name}} Team</p>
          <div class="footer">
            © 2025 {{company_name}}. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  },
};
