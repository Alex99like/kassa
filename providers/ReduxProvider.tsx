'use client'

import { store } from '@/store/store'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

export const ReduxProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={store}>
      <AnimatePresence>
        {children}
      </AnimatePresence>
    </Provider>
  )
} 