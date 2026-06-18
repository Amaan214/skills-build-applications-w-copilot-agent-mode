import mongoose from 'mongoose';

/**
 * Initialize database connection
 */
export const initializeDatabase = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('✓ Database connected successfully');
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    throw error;
  }
};

/**
 * Disconnect from database
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ Database disconnected');
  } catch (error) {
    console.error('✗ Database disconnection failed:', error);
    throw error;
  }
};

/**
 * Get database connection status
 */
export const getDatabaseStatus = (): string => {
  const state = mongoose.connection.readyState;
  const states: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };
  return states[state] || 'unknown';
};