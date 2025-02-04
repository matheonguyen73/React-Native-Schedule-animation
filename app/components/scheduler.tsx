import * as React from 'react';
import { Text, View, StyleSheet, Switch, Pressable, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { FadeInDown, FadeInUp, FadeOut, LinearTransition } from 'react-native-reanimated';
const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'] as const;
const _spacing = 10;
const _color = '#ececec';
const _borderRadius = 16;
const _startHour = 8;
const _damping = 14;
const _entering = FadeInDown.springify().damping(_damping);
const _exiting = FadeOut.springify().damping(_damping);
const _layout = LinearTransition.springify().damping(_damping);;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SchedulerProps { }

interface DayProps {
    day: typeof weekDays[number];
}

interface HourBlockProps {
    block: number;
}

const HourBlock = ({ block }: HourBlockProps) => {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: _color,
            borderRadius: _borderRadius - _spacing,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: _spacing / 4,
        }}>
            <Text>
                {block > 9 ? block : `0${block}`}:00 {block > 11 ? 'PM' : 'AM'}
            </Text>

        </View>
    )
}

const DayBlock = () => {
    const [hours, setHours] = React.useState([_startHour]);
    return (
        <Animated.View style={{
            borderRadius: _borderRadius,
            flexDirection: 'column',
            gap: _spacing,

        }}
            layout={_layout}
            entering={_entering}
            exiting={_exiting}
        >
            {hours.map((hour, index) => (
                <Animated.View
                    key={`hour-${hour}`}
                    style={{
                        flexDirection: 'row',
                        gap: _spacing,
                        alignItems: 'center'
                    }}
                    layout={_layout}
                    entering={_entering}
                    exiting={_exiting}
                >
                    <Text>From: </Text>
                    <HourBlock block={hour} />
                    <Text>To: </Text>
                    <HourBlock block={hour + 1} />
                    <AnimatedPressable
                        layout={_layout}
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.1)',
                            borderRadius: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            aspectRatio: 1,
                            width: 22,
                        }}
                        onPress={() => {
                            setHours(hours.filter((h) => h !== hour));
                        }}
                    >
                        <Ionicons name="close" size={18} color="#555" />
                    </AnimatedPressable>
                </Animated.View>
            ))}
            <AnimatedTouchableOpacity
                layout={_layout}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    padding: _spacing,
                    borderRadius: _borderRadius,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: _spacing,
                    flexDirection: 'row',
                }}
                onPress={() => {
                    if (hours.length === 0) {
                        setHours([_startHour]);
                        return;
                    }
                    setHours([...hours, hours[hours.length - 1] + 1]);
                }}
            >
                <Ionicons name="add" size={18} color="black" />
                <Text>{'Add more'}</Text>
            </AnimatedTouchableOpacity>
        </Animated.View>
    );
}

const Day = (props: DayProps) => {
    const [isOn, setIsOn] = React.useState(false);
    return (
        <Animated.View layout={_layout}
            style={[styles.day, { backgroundColor: isOn ? "transparent" : _color }]}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <Text>{props.day}</Text>
                <Switch value={isOn}
                    onValueChange={setIsOn}
                    trackColor={{ true: '#666' }}
                    style={{
                        transformOrigin: 'center',
                        transform: [{
                            scale: 0.7
                        }],

                    }}
                />
            </View>
            {isOn && <DayBlock />}
        </Animated.View>
    );
}

const Scheduler = (props: SchedulerProps) => {
    return (
        <View style={styles.container}>
            {weekDays.map((day, index) => <Day
                day={day}
                key={`day-${day}`}
            />)}
        </View>
    );
};

export default Scheduler;

const styles = StyleSheet.create({
    container: {
        gap: _spacing,
        padding: _spacing,
    },
    day: {
        // backgroundColor: _color,
        flexDirection: 'column',
        borderRadius: _borderRadius,
        padding: _spacing,
        borderWidth: 1,
        borderColor: _color,
    },
});
