import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions as rootActions } from '@/store/root/root.slices'

const allActions = {
  ...rootActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  
  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}
