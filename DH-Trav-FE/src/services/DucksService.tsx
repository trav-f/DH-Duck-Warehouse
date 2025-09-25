import { createContext, useContext, useState, type ReactNode } from "react";
import type { Duck } from '../models/Duck';

const API_BASE_URL = 'http://localhost:3000';

type DucksContextType = {
  ducks: Duck[];
  loading: boolean;
  error: string | null;
  getDucks: () => Promise<void>;
  createDuck: (duck: Omit<Duck, 'id' | 'deleted'>) => Promise<void>;
  updateDuck: (id: number, duck: Omit<Duck, 'id' | 'deleted'>) => Promise<void>;
  deleteDuck: (id: number) => Promise<void>;
};

const DucksContext = createContext<DucksContextType | undefined>(undefined);

export const DucksProvider = ({ children }: { children: ReactNode }) => {
  const [ducks, setDucks] = useState<Duck[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = `${API_BASE_URL}/ducks`;

  const handleError = (error: unknown, operation: string) => {
    const errorMessage = error instanceof Error ? error.message : `Unknown error during ${operation}`;
    console.error(`Error ${operation}:`, error);
    setError(errorMessage);
  };

  const getDucks = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetchedDucks: Duck[] = await response.json();
      setDucks(fetchedDucks);
    } catch (error) {
      handleError(error, 'fetching ducks');
    } finally {
      setLoading(false);
    }
  };

  const createDuck = async (duck: Omit<Duck, 'id' | 'deleted'>): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // check to see if a duck with the same color, size, and price already exists
      const existingDuck = ducks.find(d => d.color === duck.color && d.size === duck.size && d.price === duck.price);
      if (existingDuck) {
        // add the quantity to the existing duck and update the duck
        existingDuck.quantity += duck.quantity;
        const response = await fetch(`${baseUrl}/${existingDuck.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(existingDuck),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return;
      } else {
        // create a new duck
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(duck),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return;
      }

    } catch (error) {
      handleError(error, 'creating duck');
    } finally {
      await getDucks();
      setLoading(false);
    }
  };

  const updateDuck = async (id: number, duck: Omit<Duck, 'id' | 'deleted'>): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(duck),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      handleError(error, 'updating duck');
    } finally {
      await getDucks();
      setLoading(false);
    }
  };

  const deleteDuck = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      handleError(error, 'deleting duck');
    } finally {
      await getDucks();
      setLoading(false);
    }
  };

  return (
    <DucksContext.Provider value={{
      ducks,
      loading,
      error,
      getDucks,
      createDuck, 
      updateDuck, 
      deleteDuck 
    }}>
      {children}
    </DucksContext.Provider>
  );
};

export const useDucksContext = () => {
  const context = useContext(DucksContext);
  if (!context) throw new Error("useDucksContext must be used inside DucksProvider");
  return context;
};