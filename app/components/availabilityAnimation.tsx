import * as React from 'react';
import { Text, View, StyleSheet, Image, ViewProps } from 'react-native';
import { HomeType } from '..';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';
import { MotiView } from 'moti';

interface AvailabilityAnimationProps {
    data: HomeType;
}

const _itemSize = 60;
const _spacing = 5;
const _stagger = 75;
const _color = '#ececec';
const _borderRadius = 8;
const _loadingColor = '#ddd';
const _loadingColorWash = '#eee';
const getRandomeRotation = () => {
    return (Math.random() > 0.5 ? 1 : -1) * Math.random() * 15;;
}

const Item = ({ item, index }: { item: HomeType, index: number }) => {
    return (
        <View style={{
            aspectRatio: 1,
            borderColor: _color,
            borderRadius: _borderRadius,
            // margin: _spacing,
            width: _itemSize,
            padding: _spacing,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.4,
            elevation: 5,
            shadowRadius: 7,
            marginLeft: index === 0 ? 0 : -_itemSize / 2,
            transform: [
                { rotate: `${getRandomeRotation()}deg` }
            ]
        }}>
            <Image source={{ uri: item.image }}
                style={{
                    flex: 1,
                    borderRadius: _borderRadius
                }} />
        </View>
    );
};

export function Skeleton({ style, ...rest }: ViewProps) {
    return (
        <MotiView style={style}
            {...rest}
            from={{
                backgroundColor: _loadingColor
            }}
            animate={{
                backgroundColor: _loadingColorWash
            }}
            transition={{
                duration: 1000,
                loop: true,
                repeatReverse: true
            }}
            entering={FadeIn.springify().damping(80).stiffness(200)}
            exiting={FadeOut.springify().damping(80).stiffness(200)}
        >

        </MotiView>
    )
}

export function LoadingSkeleton() {
    return (
        <View style={{
            flexDirection: 'row',
        }}>
            {[...Array(3).keys()].map((index) => (
                <Skeleton key={index} style={{
                    width: _itemSize,
                    aspectRatio: 1,
                    backgroundColor: _loadingColor,
                    borderRadius: _borderRadius,
                    borderWidth: _spacing,
                    borderColor: '#fff',
                    marginLeft: index === 0 ? 0 : -_itemSize / 2,
                    transform: [
                        { rotate: `${getRandomeRotation()}deg` }
                    ]

                }} />
            ))}
        </View>
    )
}

const AvailabilityAnimation = ({ data, isLoading }: { data: HomeType[], isLoading: boolean }) => {
    return (
        <View style={styles.container}>
            <View style={{
                flex: 0.6,
                justifyContent: 'center',
                minHeight: _itemSize,
            }}>
                {isLoading ? <Skeleton style={{
                    width: '80%',
                    height: _itemSize * .25,
                    backgroundColor: _loadingColor,
                    borderRadius: _borderRadius,

                }} /> : < Animated.Text entering={FadeIn.springify().damping(80).stiffness(200)}
                    exiting={FadeOut.springify().damping(80).stiffness(200)}>{data.length} available</Animated.Text>}

            </View>
            <View style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'flex-end',
                minHeight: _itemSize,
            }}>
                {!isLoading ? data.map((item, index) => (
                    <Animated.View
                        key={item.key}
                        style={{
                            zIndex: index
                        }}
                        entering={
                            ZoomIn.springify().stiffness(100).damping(80).delay(index * _stagger)
                        }
                        exiting={
                            ZoomOut.springify().stiffness(100).damping(80).delay(index * _stagger)
                        }
                    >
                        <Item item={item} index={index} />
                    </Animated.View>
                )) : <LoadingSkeleton />}
            </View>
        </View>
    );
};

export default AvailabilityAnimation;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
    }
});
