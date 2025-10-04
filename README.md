# 📚 Books & Reviews Management System

A full-stack web application for managing books, reviews, and quizzes with beautiful animated UI components.

## 🚀 Features

### 📖 Book Management
- View all books with detailed information
- Search books by title, author, genre, or year
- Expandable reviews for each book
- Star rating system
- Real-time statistics

### ⭐ Review System
- Add and view book reviews
- Rating system (1-5 stars)
- Average rating calculation
- Review cards with animations

### 🎯 Quiz Management
- Create and manage quizzes
- Add quiz questions
- Online/Offline status toggle
- Quiz review system

### 📊 Dashboard
- Categorized data display (Business, Important, Personal)
- Three-column layout
- Color-coded categories with icons
- Real-time data updates

### 🎨 Modern UI/UX
- Animated gradient backgrounds
- Floating shapes and particles
- Glassmorphism design
- Responsive layouts
- Smooth transitions and hover effects

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your-database-name
NODE_ENV=development
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the frontend directory (optional):
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🚀 Running the Application

### Start Backend Server

From the backend directory:
```bash
npm run dev
```

The backend server will start on `http://localhost:8000`

### Start Frontend Application

From the frontend directory:
```bash
npm start
```

The frontend application will start on `http://localhost:3000`

## 🎯 API Endpoints

### Books
- `GET /allreview` - Get all books and reviews
- `POST /addbook` - Add a new book
- `PUT /updatebook/:id` - Update a book
- `DELETE /deletebook/:id` - Delete a book

### Reviews
- `GET /reviews/:bookId` - Get reviews for a specific book
- `POST /addreview` - Add a new review
- `DELETE /deletereview/:id` - Delete a review

### Quizzes
- `GET /reviewquiz` - Get all quizzes
- `POST /AddData` - Add a new quiz
- `PUT /updatequiz/:id` - Update a quiz
- `DELETE /deletequiz/:id` - Delete a quiz

### Dashboard
- `GET /dashboard/` - Get dashboard data

## 🎨 Component Features

### Dashboard
- Three-column category layout (Business, Important, Personal)
- Color-coded with unique icons
- Wide responsive design
- Click to expand/collapse items

### AddQuiz
- Animated gradient background
- Floating particles and shapes
- Glassmorphism card design
- Form validation
- Loading states

### ViewAllRating
- Animated wave background
- Floating geometric shapes
- Particle effects
- Search functionality
- Expandable reviews
- Statistics cards

### ReviewResult
- Professional table layout
- Admin ID display
- Loading spinner
- Action buttons with gradients
- Responsive design

## 🎭 Styling Features

- **Animated Gradients**: Multi-color flowing backgrounds
- **Glassmorphism**: Frosted glass effect on cards
- **Floating Elements**: Animated shapes and particles
- **Smooth Transitions**: All hover and focus effects
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Modern UI**: Contemporary design patterns

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/your-database-name
NODE_ENV=development
JWT_SECRET=your-secret-key (if using authentication)
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
sudo service mongod status

# Start MongoDB
sudo service mongod start
```

**Port Already in Use:**
```bash
# Change PORT in backend/.env file
PORT=8001
```

### Frontend Issues

**Port 3000 Already in Use:**
```bash
# The system will ask if you want to use another port
# Or manually change port:
PORT=3001 npm start
```

**API Connection Error:**
- Ensure backend is running on port 8000
- Check REACT_APP_API_URL in .env file
- Verify CORS settings in backend

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "nodemon": "^2.0.22"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.10.0",
  "axios": "^1.4.0"
}
```

## 🚀 Deployment

### Backend Deployment (Heroku/Render)
1. Create a new app on your hosting platform
2. Set environment variables
3. Deploy from GitHub or CLI
4. Update frontend API URL

### Frontend Deployment (Vercel/Netlify)
1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the `build` folder
3. Update environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React.js documentation
- MongoDB documentation
- Express.js guides
- CSS animation tutorials
- Open source community

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🔄 Version History

- **v1.0.0** - Initial release
  - Dashboard with category columns
  - Book and review management
  - Quiz system
  - Animated UI components

---

Made with ❤️ and lots of ☕
