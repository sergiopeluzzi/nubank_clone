import React from 'react'
import { Animated } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import { Container, Content, Card, CardHeader, CardContent, CardFooter, Title, Description, Annotation } from './styles'
import Header from '../Header'
import Tabs from '../Tabs'
import Menu from '../Menu'

import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Home() {
    let offset = 0
    const translateY = new Animated.Value(0)

    const animatedEvent = Animated.event(
        [
            {
                nativeEvent: {
                    translationY: translateY
                }
            }
        ],
        { useNativeDriver: true }
    )

    function onHandlerStateChange(event) {
        //Qndo acabar a animação
        if(event.nativeEvent.oldState == State.ACTIVE) {
            let opened = false
            //Valor de quanto o ususario arrastou o card
            const { translationY } = event.nativeEvent
            
            offset += translationY

            //Se a qnt de pixels que o usuario arrasotu
            if (translationY >= 100) {
                opened = true
            } else {
                translateY.setValue(offset)
                translateY.setOffset(0)
                offset = 0
            }

            Animated.timing(translateY, {
                toValue: opened ? 380 : 0,
                duration: 200,
                useNativeDriver: true
            }).start(() => {
                offset = opened ? 380 : 0
                translateY.setOffset(offset)
                translateY.setValue(0)
            })   

        }
    }

    return (
        <Container>
            <Header />

            <Content>
                <Menu translateY={ translateY }>
                    
                </Menu>

                <PanGestureHandler
                    onGestureEvent={ animatedEvent }
                    onHandlerStateChange={ onHandlerStateChange }
                >
                    <Card 
                        style={{
                            transform: [
                                {
                                    translateY: translateY.interpolate({
                                        inputRange: [-350, 0, 380],
                                        outputRange: [-50, 0, 380],
                                        extrapolate: 'clamp'
                                    }),
                                }
                            ]
                        }}
                    >
                        <CardHeader>
                            <Icon name="attach-money" size={28} color="#666" />
                            <Icon name="visibility-off" size={28} color="#666" />
                        </CardHeader>
                        <CardContent>
                            <Title>Saldo disponínel</Title>
                            <Description>R$ 138.976,88</Description>
                        </CardContent>
                        <CardFooter>
                            <Annotation>
                                Transferência de R$ 6.000,00 recebida de Lauriana Vaz Peluzzi hoje às 09:43h
                            </Annotation>
                        </CardFooter>
                    </Card>
                </PanGestureHandler>
            </Content>

            <Tabs translateY={ translateY } />
        </Container>
    )
}