# 💰 Expense Tracker

A modern, full-stack expense tracking application built with React, TypeScript, and Express.js. Track your expenses with style and efficiency!

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19.2-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

## ✨ Features

🎨 **Beautiful UI**
- Modern gradient design with blue ocean theme
- Smooth animations and hover effects
- Fully responsive across all devices
- Glass-morphism effects with backdrop blur

💼 **Expense Management**
- Add expenses with random generation
- View all expenses in a clean list format
- Sort by date (newest/oldest) or amount (highest/lowest)
- Reset data to initial state for development

🔧 **Technical Features**
- RESTful API with Express.js backend
- TypeScript for type safety
- Real-time data persistence
- Error handling and loading states
- Development utilities for data management

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd WebQuestionSpe
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📁 Project Structure

```
WebQuestionSpe/
├── backend/                 # Express.js API server
│   ├── app.js              # Main application file
│   ├── package.json        # Backend dependencies
│   ├── bin/
│   │   └── www             # Server startup script
│   ├── data/               # JSON data storage
│   │   ├── expenses.json   # Current expenses data
│   │   └── expenses.init.json # Initial/reset data
│   ├── routes/             # API route handlers
│   │   ├── expenses.js     # Expense CRUD operations
│   │   ├── index.js        # Root routes
│   │   └── users.js        # User routes
│   └── services/           # Business logic
│       └── expenses.js     # Expense service functions
├── frontend/               # React TypeScript app
│   ├── package.json        # Frontend dependencies
│   ├── index.html          # Main HTML template
│   ├── vite.config.ts      # Vite configuration
│   ├── tsconfig.json       # TypeScript configuration
│   ├── public/             # Static assets
│   └── src/                # Source code
│       ├── App.tsx         # Main app component
│       ├── App.css         # Global styles
│       ├── main.tsx        # Application entry point
│       ├── components/     # Reusable components
│       │   ├── ExpenseAdd.tsx    # Add expense button
│       │   ├── ExpenseItem.tsx   # Individual expense display
│       │   └── ExpenseSorter.tsx # Sort functionality
│       ├── pages/          # Page components
│       │   └── Home.tsx    # Main page
│       ├── types/          # TypeScript type definitions
│       │   └── Expense.ts  # Expense interface
│       └── utils/          # Utility functions
│           └── sortUtils.ts # Sorting algorithms
```

## 🛠️ API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/expenses` | Get all expenses | Array of expense objects |
| `POST` | `/expenses` | Add new expense | Created expense object |
| `POST` | `/expenses/reset` | Reset to initial data | Success message + reset data |

### Expense Object Structure

```typescript
interface Expense {
  id: string;           // Unique identifier
  date: string;         // Date in YYYY-MM-DD format
  description: string;  // Expense description
  payer: string;        // Person who paid (Alice/Bob)
  amount: number;       // Amount with 2 decimal places
}
```

## 🎯 Usage Examples

### Adding an Expense

Click the **"ADD"** button to generate a random expense with:
- Random payer (Alice or Bob)
- Random amount (0-100 with 2 decimal places)
- Current date
- Generic description

### Sorting Expenses

Use the dropdown to sort by:
- **Date (Newest First)** - Most recent expenses first
- **Date (Oldest First)** - Oldest expenses first
- **Amount (Highest First)** - Highest amounts first
- **Amount (Lowest First)** - Lowest amounts first

### Resetting Data

Click **"RESET DATA"** to restore the expense list to its initial state.

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#3498db` - Main brand color
- **Dark Blue**: `#2980b9` - Darker shade for depth
- **Teal Accent**: `#1abc9c` - Fresh accent color
- **Orange Amount**: `#e67e22` - Expense amount highlight
- **Background**: Blue to teal gradient

### Typography

- **Font Family**: Inter, system fonts
- **Headings**: 700 weight with gradient text effects
- **Body Text**: 400-600 weight for readability

### Animations

- **Slide In**: New expenses animate in from below
- **Hover Effects**: Subtle lift and shadow changes
- **Loading Spinner**: Smooth rotation animation

## 🔧 Development

### Available Scripts

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Auto-formatting on save
- **Import organization**: Type-only imports when possible

### Environment Setup

The application uses default ports:
- Backend: `3000`
- Frontend: `5173`

CORS is configured to allow cross-origin requests during development.

## 🚦 Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Graceful fallbacks for API failures
- **Loading States**: Visual feedback during data operations
- **Validation**: Input validation on both client and server
- **User Feedback**: Success/error messages for all operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite for lightning-fast development
- Express.js for the robust backend framework
- The open-source community for inspiration

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Express.js**

*Happy expense tracking! 💰*

</div>
