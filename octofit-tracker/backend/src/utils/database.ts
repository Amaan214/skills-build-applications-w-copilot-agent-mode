import mongoose from 'mongoose';

/**
 * Initialize database connection to octofit_db MongoDB database
 * Connects to the octofit_db collection using mongoose connection pooling
 */
export const initializeDatabase = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('✓ octofit_db Database connected successfully using mongoose');
  } catch (error) {
    console.error('✗ Database connection failed:', error);
    throw error;
  }
};

/**
 * Disconnect from octofit_db database
 * Closes the mongoose connection gracefully
 */
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✓ octofit_db Database disconnected');
  } catch (error) {
    console.error('✗ Database disconnection failed:', error);
    throw error;
  }
};

/**
 * Get database connection status
 * Returns the current state of the mongoose connection
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
