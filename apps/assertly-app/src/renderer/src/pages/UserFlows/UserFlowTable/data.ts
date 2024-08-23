export type UserFlow = {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  steps: {
    id: string
    type: 'action' | 'assertion' | 'wait'
    description: string
    details: Record<string, any>
  }[]
  tags: string[]
  createdBy: string
  lastUsedAt?: string
}

export const userFlows: UserFlow[] = [
  {
    id: 'uf1',
    name: 'Login Flow',
    description: 'Basic user login process',
    createdAt: '2024-06-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Enter username', details: { selector: '#username' } },
      { id: 's2', type: 'action', description: 'Enter password', details: { selector: '#password' } },
      { id: 's3', type: 'action', description: 'Click login button', details: { selector: '#login-btn' } },
      { id: 's4', type: 'assertion', description: 'Check if logged in', details: { selector: '.user-profile' } }
    ],
    tags: ['authentication', 'critical'],
    createdBy: 'user123',
    lastUsedAt: '2024-06-28T09:30:00Z'
  },
  {
    id: 'uf2',
    name: 'Product Search',
    description: 'Search for a product and verify results',
    createdAt: '2024-06-02T14:30:00Z',
    updatedAt: '2024-06-02T14:30:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Enter search term', details: { selector: '#search-input' } },
      { id: 's2', type: 'action', description: 'Click search button', details: { selector: '#search-btn' } },
      { id: 's3', type: 'assertion', description: 'Verify search results', details: { selector: '.search-results' } }
    ],
    tags: ['search', 'product'],
    createdBy: 'user456',
    lastUsedAt: '2024-06-27T16:45:00Z'
  },
  {
    id: 'uf3',
    name: 'Add to Cart',
    description: 'Add a product to the shopping cart',
    createdAt: '2024-06-03T09:15:00Z',
    updatedAt: '2024-06-03T09:15:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Navigate to product page', details: { url: '/product/123' } },
      { id: 's2', type: 'action', description: 'Click add to cart button', details: { selector: '#add-to-cart' } },
      { id: 's3', type: 'assertion', description: 'Verify cart updated', details: { selector: '#cart-count' } }
    ],
    tags: ['shopping', 'cart'],
    createdBy: 'user789',
    lastUsedAt: '2024-06-26T11:20:00Z'
  },
  {
    id: 'uf4',
    name: 'Checkout Process',
    description: 'Complete the checkout process',
    createdAt: '2024-06-04T13:45:00Z',
    updatedAt: '2024-06-04T13:45:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Go to cart', details: { selector: '#cart-link' } },
      { id: 's2', type: 'action', description: 'Click checkout', details: { selector: '#checkout-btn' } },
      { id: 's3', type: 'action', description: 'Fill shipping details', details: { form: '#shipping-form' } },
      { id: 's4', type: 'action', description: 'Select payment method', details: { selector: '#payment-method' } },
      { id: 's5', type: 'action', description: 'Confirm order', details: { selector: '#confirm-order-btn' } },
      {
        id: 's6',
        type: 'assertion',
        description: 'Verify order confirmation',
        details: { selector: '.order-confirmed' }
      }
    ],
    tags: ['checkout', 'critical'],
    createdBy: 'user101',
    lastUsedAt: '2024-06-25T17:30:00Z'
  },
  {
    id: 'uf5',
    name: 'User Registration',
    description: 'New user registration process',
    createdAt: '2024-06-05T11:00:00Z',
    updatedAt: '2024-06-05T11:00:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Go to registration page', details: { url: '/register' } },
      { id: 's2', type: 'action', description: 'Fill registration form', details: { form: '#registration-form' } },
      { id: 's3', type: 'action', description: 'Submit form', details: { selector: '#submit-registration' } },
      { id: 's4', type: 'assertion', description: 'Verify account created', details: { selector: '.welcome-message' } }
    ],
    tags: ['registration', 'user-management'],
    createdBy: 'user202',
    lastUsedAt: '2024-06-24T10:15:00Z'
  },
  {
    id: 'uf6',
    name: 'Password Reset',
    description: 'Reset user password',
    createdAt: '2024-06-06T16:20:00Z',
    updatedAt: '2024-06-06T16:20:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Go to forgot password page', details: { url: '/forgot-password' } },
      { id: 's2', type: 'action', description: 'Enter email', details: { selector: '#email-input' } },
      { id: 's3', type: 'action', description: 'Submit request', details: { selector: '#reset-password-btn' } },
      {
        id: 's4',
        type: 'assertion',
        description: 'Verify confirmation message',
        details: { selector: '.confirmation-msg' }
      }
    ],
    tags: ['password', 'user-management'],
    createdBy: 'user303',
    lastUsedAt: '2024-06-23T14:40:00Z'
  },
  {
    id: 'uf7',
    name: 'Product Review',
    description: 'Submit a product review',
    createdAt: '2024-06-07T09:30:00Z',
    updatedAt: '2024-06-07T09:30:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Navigate to product', details: { url: '/product/456' } },
      { id: 's2', type: 'action', description: 'Click write review', details: { selector: '#write-review-btn' } },
      { id: 's3', type: 'action', description: 'Fill review form', details: { form: '#review-form' } },
      { id: 's4', type: 'action', description: 'Submit review', details: { selector: '#submit-review-btn' } },
      {
        id: 's5',
        type: 'assertion',
        description: 'Verify review posted',
        details: { selector: '.review-confirmation' }
      }
    ],
    tags: ['product', 'review'],
    createdBy: 'user404',
    lastUsedAt: '2024-06-22T11:55:00Z'
  },
  {
    id: 'uf8',
    name: 'Newsletter Subscription',
    description: 'Subscribe to newsletter',
    createdAt: '2024-06-08T15:10:00Z',
    updatedAt: '2024-06-08T15:10:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Scroll to footer', details: { selector: '#footer' } },
      { id: 's2', type: 'action', description: 'Enter email', details: { selector: '#newsletter-email' } },
      { id: 's3', type: 'action', description: 'Click subscribe', details: { selector: '#subscribe-btn' } },
      {
        id: 's4',
        type: 'assertion',
        description: 'Verify subscription message',
        details: { selector: '.subscription-confirmed' }
      }
    ],
    tags: ['marketing', 'newsletter'],
    createdBy: 'user505',
    lastUsedAt: '2024-06-21T16:30:00Z'
  },
  {
    id: 'uf9',
    name: 'Social Media Share',
    description: 'Share product on social media',
    createdAt: '2024-06-09T11:40:00Z',
    updatedAt: '2024-06-09T11:40:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Go to product page', details: { url: '/product/789' } },
      { id: 's2', type: 'action', description: 'Click share button', details: { selector: '#share-btn' } },
      { id: 's3', type: 'action', description: 'Select social platform', details: { selector: '#facebook-share' } },
      { id: 's4', type: 'assertion', description: 'Verify share dialog', details: { selector: '.share-dialog' } }
    ],
    tags: ['social-media', 'sharing'],
    createdBy: 'user606',
    lastUsedAt: '2024-06-20T13:25:00Z'
  },
  {
    id: 'uf10',
    name: 'Apply Coupon',
    description: 'Apply a coupon code at checkout',
    createdAt: '2024-06-10T14:50:00Z',
    updatedAt: '2024-06-10T14:50:00Z',
    steps: [
      { id: 's1', type: 'action', description: 'Go to cart', details: { url: '/cart' } },
      { id: 's2', type: 'action', description: 'Enter coupon code', details: { selector: '#coupon-input' } },
      { id: 's3', type: 'action', description: 'Apply coupon', details: { selector: '#apply-coupon-btn' } },
      { id: 's4', type: 'wait', description: 'Wait for price update', details: { duration: 2000 } },
      {
        id: 's5',
        type: 'assertion',
        description: 'Verify discount applied',
        details: { selector: '.discount-applied' }
      }
    ],
    tags: ['checkout', 'coupon'],
    createdBy: 'user707',
    lastUsedAt: '2024-06-19T10:05:00Z'
  }
]
