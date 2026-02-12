import { renderHook, act } from '@testing-library/react';
import { SubjectProvider, useSubject, subjects } from '../SubjectContext';
import { ReactNode } from 'react';

describe('SubjectContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <SubjectProvider>{children}</SubjectProvider>
  );

  it('should provide initial null subject', () => {
    const { result } = renderHook(() => useSubject(), { wrapper });
    expect(result.current.selectedSubject).toBeNull();
  });

  it('should update selected subject', () => {
    const { result } = renderHook(() => useSubject(), { wrapper });
    
    act(() => {
      result.current.setSelectedSubject('physics');
    });
    
    expect(result.current.selectedSubject).toBe('physics');
  });

  it('should get subject info correctly', () => {
    const { result } = renderHook(() => useSubject(), { wrapper });
    
    const physicsInfo = result.current.getSubjectInfo('physics');
    
    expect(physicsInfo.id).toBe('physics');
    expect(physicsInfo.name).toBe('Physics');
    expect(physicsInfo.icon).toBe('⚛️');
  });

  it('should throw error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    expect(() => {
      renderHook(() => useSubject());
    }).toThrow('useSubject must be used within SubjectProvider');
    
    consoleSpy.mockRestore();
  });

  it('should have all four subjects defined', () => {
    expect(subjects).toHaveLength(4);
    expect(subjects.map(s => s.id)).toEqual(['physics', 'mathematics', 'chemistry', 'biology']);
  });
});
