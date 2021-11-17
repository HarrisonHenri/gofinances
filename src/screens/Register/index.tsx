import React, { useCallback, useState } from 'react'
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { Button } from '../../components/Forms/Button'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { ControlledInput } from '../../components/Forms/ControlledInput'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { AppNavigationProps } from '../../routes/app.routes.model'
import { api } from '../../services/api'
import { CategorySelect } from '../CategorySelect'
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles'

interface FormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor númerico')
    .positive('Insira um número positivo')
    .required('Valor é obrigatório'),
})

const defaultCategory = {
  key: 'category',
  name: 'Categoria',
}

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [category, setCategory] = useState(defaultCategory)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const { navigate } = useNavigation<AppNavigationProps>()

  const handleTransactionsTypeSelect = useCallback(
    (type: 'deposit' | 'withdraw') => {
      setTransactionType(type)
    },
    [setTransactionType],
  )

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true)
  }, [setCategoryModalOpen])

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false)
  }, [setCategoryModalOpen])

  const handleRegister = useCallback(
    async (form: FormData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação')

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria')

      const data = {
        description: form.name,
        category: category.key,
        amount: Number(form.amount),
      }

      const uri = `/api/v1/statements/${transactionType}`

      try {
        await api.post(uri, data)

        setTransactionType('')
        setCategory(defaultCategory)
        reset()

        navigate('Listagem')

        return null
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          transactionType === 'withdraw' &&
          error.response?.status === 400
        ) {
          return Alert.alert('Você não possui saldo suficiente')
        }
        return Alert.alert('Erro ao realizar a operação, tente novamente')
      }
    },
    [transactionType, category, reset, navigate],
  )

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <ControlledInput
              placeholder="Nome"
              name="name"
              control={control}
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <ControlledInput
              placeholder="Valor"
              name="amount"
              control={control}
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsTypes>
              <TransactionTypeButton
                type="up"
                title="Income"
                onPress={() => handleTransactionsTypeSelect('deposit')}
                isActive={transactionType === 'deposit'}
              />
              <TransactionTypeButton
                type="down"
                title="Outcome"
                onPress={() => handleTransactionsTypeSelect('withdraw')}
                isActive={transactionType === 'withdraw'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              testID="category-btn"
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal testID="modal-category" visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
