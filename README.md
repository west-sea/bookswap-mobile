# BookSwap
## 1. Project Introduction
### 1.1 Object
BookSwap is a collaborative book-sharing platform designed for KAIST students, enhancing their access to a diverse range of books beyond the library’s collection. It features a search function to locate specific titles, a book exchange system, and a messaging tool for easy communication on transaction details, promoting reading and cultural enrichment among students.

### 1.2 Teammate
- Alisher Ortiqov: Backend Development
- Haerin Seo: Frontend development
- Changsu Ham: UI/UX design, prototype
- Sejun Jung: Project management

### 1.3 Development Environment
- Backend: Node JS
- Frontend: React Native
- Design: Figma
- Project Management: Jira

### 1.4 Project Structure
```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.js
│   │   ├── auth/
│   │   │   ├── boarding.js
│   │   │   ├── index.js
│   │   │   └── welcome.js
│   │   ├── tabs/
│   │   │   ├── bookshelf/
│   │   │   │   ├── edit.js
│   │   │   │   ├── index.js
│   │   │   │   ├── requests.js
│   │   │   │   └── user.js
│   │   │   ├── home/
│   │   │   │   ├── index.js
│   │   │   │   ├── notifications.js
│   │   │   │   └── search.js
│   │   │   ├── message/
│   │   │   │   ├── chat.js
│   │   │   │   └── index.js
│   │   │   └── profile/
│   │   │       ├── about.js
│   │   │       ├── edit-genres.js
│   │   │       ├── edit.js
│   │   │       ├── index.js
│   │   │       └── my-exchanges.js
│   │   ├── index.js
├── assets/
│   ├── fonts/
│   ├── png/
│   └── svg/
├── components/...
├── contexts/...
├── hooks/...
├── locales/
│   ├── english.json
│   ├── i18n.js
│   └── korean.json
├── node_modules/...
├── GoogleService-Info.plist
├── metro.config.js
├── README.md
├── app.json
├── eas.json
├── GlobalStyles.js
├── google-services.json
├── old-api/
├── store/
├── babel.config.js
├── package.json
└── yarn.lock
```

## 2. System Overview
### 2.1 Setting Up Your Profile and Uploading Your First Book
- Log In: Access the login page and enter your credentials to log in.
- Initialize Your Profile: Once logged in, you'll be directed to initialize your profile. Here, choose a nickname for yourself and select your preferred genres.
- Upload Your Book: Navigate to the bookshelf page and find the option to upload your book. Fill in the necessary details about the book you wish to share.
- Check Your Bookshelf: After uploading, you'll be redirected to the bookshelf page where you can see your uploaded book among your listings.

### 2.2 Managing Your Bookshelf
- Access Your Bookshelf: Go to your bookshelf page where your listed books are displayed.
- Edit Your Book: Choose a book you want to modify and go to its edit page (the same as the upload page). Here, adjust the visibility options as desired.
- Confirm Changes: Save your changes, and you will be taken back to the bookshelf page. Ensure that the modifications are reflected correctly.

### 2.3 Searching and Requesting a Book Exchange
- Search for a Book: From the home page, use the search feature to find a specific book you're interested in.
- Request an Exchange: On the search result page, which displays a list of books matching your query, choose a book you want to exchange and submit a request for exchange.

### 2.4 Managing Exchange Requests and Communication
- View Notifications: Check your notifications for any exchange requests from other users.
- Accept the Request: Go to the request page through the notification link and accept the exchange request. Indicate that you want the specific book from the requester’s bookshelf.
- Send a Message: After accepting the request, find an option to message the user. Use the message per user screen to communicate with them about the exchange details.

