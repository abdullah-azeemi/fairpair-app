# FairPair

**FairPair** is a comprehensive full-stack application designed for seamless project management and real-time collaboration. Built with modern web technologies, it offers a robust platform for teams to connect, manage tasks, and communicate effectively.

## 🚀 Features

- **User Authentication**: Secure login and signup powered by NextAuth and Argon2.
- **Interactive Dashboard**: innovative dashboard for tracking project progress and user activities.
- **Project Management**: Create, update, and manage projects with ease.
- **Real-time Messaging**: Instant communication using Socket.io for real-time chat updates.
- **Collaboration Tools**: Shared notes and resources for team collaboration.
- **AI Integration**: AI-powered features for enhanced productivity and recommendations.
- **Responsive Design**: optimizing for all devices with Tailwind CSS 4.

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Directory), [React 19](https://react.dev/), [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend & Database**: [Supabase](https://supabase.com/), [Express](https://expressjs.com/) (Custom Server)
- **Real-time**: [Socket.io](https://socket.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Utilities**: [Axios](https://axios-http.com/), [date-fns](https://date-fns.org/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **Supabase Account**: You'll need a Supabase project for the database.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/abdullah-azeemi/fairpair-app.git
    cd fairpair-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory and add the necessary environment variables (Supabase URL, Anon Key, NextAuth Secret, etc.).

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    NEXTAUTH_SECRET=your_nextauth_secret
    # Add other required variables
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
