# Architecture

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Canvas Library**: Konva (via react-konva)
- **State Management**: Zustand
- **HTTP Client**: Native fetch API

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **File Storage**: Local filesystem (with S3 abstraction)
- **Security**: Helmet, CORS, Rate Limiting

### DevOps
- **Monorepo**: Turborepo
- **Containerization**: Docker Compose (for PostgreSQL)
- **Code Quality**: ESLint, Prettier

## Project Structure

```
canva-litmus-clone/
├── apps/
│   ├── api/                    # Backend API server
│   │   ├── prisma/            # Database schema and migrations
│   │   │   └── schema.prisma  # Prisma schema
│   │   ├── src/
│   │   │   ├── config/        # Configuration management
│   │   │   ├── lib/           # Library code (Prisma client)
│   │   │   ├── middleware/    # Express middleware
│   │   │   ├── routes/        # API route handlers
│   │   │   └── services/      # Business logic (storage service)
│   │   └── index.ts           # Server entry point
│   │
│   └── web/                    # Frontend web application
│       ├── src/
│       │   ├── api/           # API client
│       │   ├── components/    # React components
│       │   │   ├── Canvas.tsx        # Konva canvas component
│       │   │   ├── DesignList.tsx   # Design listing view
│       │   │   ├── Editor.tsx       # Main editor shell
│       │   │   ├── PropertiesPanel.tsx  # Element properties
│       │   │   └── Toolbar.tsx      # Add elements toolbar
│       │   ├── store/         # Zustand state management
│       │   ├── App.tsx        # Root component
│       │   └── main.tsx       # Application entry
│       └── index.html
│
├── packages/
│   └── shared/                # Shared TypeScript types
│       └── src/
│           └── types/         # Type definitions
│               ├── design.ts  # Design types
│               ├── element.ts # Element types
│               ├── asset.ts   # Asset types
│               └── user.ts    # User types
│
├── docker-compose.yml         # PostgreSQL container
├── package.json               # Root package with workspaces
└── turbo.json                 # Turborepo configuration
```

## Data Models

### User
- id (UUID)
- email (unique)
- name (optional)
- createdAt, updatedAt

### Design
- id (UUID)
- name
- description (optional)
- width, height (canvas dimensions)
- thumbnail (optional URL)
- elements (JSON array of DesignElement)
- userId (optional)
- createdAt, updatedAt

### Asset
- id (UUID)
- name
- mimeType
- size (bytes)
- url (public URL)
- filePath (internal storage path)
- userId (optional)
- createdAt

### DesignElement Types
- **Rectangle**: fill, stroke, strokeWidth, cornerRadius
- **Circle**: fill, stroke, strokeWidth
- **Triangle**: fill, stroke, strokeWidth
- **Text**: text, fontSize, fontFamily, fontWeight, fontStyle, fill, align, lineHeight
- **Image**: src, assetId

### Common Element Properties
- id, type, x, y, width, height
- rotation, opacity
- locked, visible, zIndex

## API Endpoints

### Health
- `GET /health` - Health check

### Designs
- `GET /api/designs` - List all designs
- `GET /api/designs/:id` - Get a design by ID
- `POST /api/designs` - Create a new design
- `PUT /api/designs/:id` - Update a design
- `DELETE /api/designs/:id` - Delete a design

### Assets
- `POST /api/assets` - Upload an asset (multipart/form-data)
- `GET /api/assets/:id` - Get asset metadata

### Static Files
- `GET /uploads/:filename` - Serve uploaded assets

## Key Features

### Editor
- Canvas-based design editor using Konva
- Add shapes (rectangle, circle, triangle)
- Add and edit text elements
- Upload and add images
- Drag, resize, and rotate elements
- Layer management (z-index)
- Properties panel for editing element attributes
- Export to PNG

### Backend
- RESTful API design
- JSON storage for canvas state
- File upload with validation
- Local filesystem storage (S3-ready abstraction)
- CORS support for cross-origin requests
- Rate limiting for API protection
- Comprehensive error handling

### Development
- Hot module reloading for both frontend and backend
- TypeScript for type safety across the stack
- Shared types package ensures consistency
- Turborepo for efficient monorepo management

## Storage Architecture

The storage service is abstracted to support multiple backends:

```typescript
interface StorageService {
  store(filename: string, buffer: Buffer, mimeType: string): Promise<string>;
  get(url: string): Promise<Buffer>;
  delete(url: string): Promise<void>;
}
```

Current implementations:
- **LocalStorageService**: Stores files on the local filesystem
- **S3StorageService**: Placeholder for future AWS S3 integration

## State Management

The editor uses Zustand for state management:

```typescript
interface EditorState {
  elements: DesignElement[];
  selectedElementId: string | null;
  setElements: (elements: DesignElement[]) => void;
  addElement: (element: DesignElement) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
}
```

## Future Enhancements

- User authentication and authorization
- Multi-user collaboration
- Real-time updates via WebSockets
- More element types (lines, arrows, charts)
- Templates library
- Export to multiple formats (PDF, SVG)
- Undo/redo functionality
- Keyboard shortcuts
- Grid and snap-to-grid
- Alignment guides
- Version history
- Comments and annotations
