import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ImageProps,
  Image,
} from 'react-native';
import {
  Datepicker,
  Calendar,
  Modal,
  Button,
  Icon,
  IconElement,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

interface State {
  date: Date;
  modalVisible: boolean;
}

export class DatepickerContainer extends React.Component<any, State> {

  public state: State = {
    date: null,
    modalVisible: false,
  };

  private setDate = (date: Date, range: any): void => {
    this.setState({ date });
  };

  private setModalVisible = (): void => {
    const modalVisible: boolean = !this.state.modalVisible;

    this.setState({ modalVisible });
  };

  private renderIcon = (style: StyleType): IconElement<any> => {
    return (
      <Icon name='calendar-outline' {...style}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Datepicker
          date={this.state.date}
          range
          icon={this.renderIcon}
          onSelect={this.setDate}
        />

        {/*<Calendar*/}
           {/*date={this.state.date}*/}
           {/*min={new Date(new Date().getFullYear(), 8, 1)}*/}
           {/*max={new Date(new Date().getFullYear() , 8, 30)}*/}
           {/*startDate={new Date('2019-09-07T21:00:00.000Z')}*/}
           {/*endDate={new Date('2019-09-12T21:00:00.000Z')}*/}
           {/*range*/}
           {/*onSelect={this.setDate}*/}
        {/*/>*/}

        {/*<Modal*/}
          {/*style={{ width: '100%'}}*/}
          {/*allowBackdrop={true}*/}
          {/*visible={this.state.modalVisible}*/}
          {/*onBackdropPress={this.setModalVisible}*/}
        {/*>*/}
          {/*<Calendar*/}
            {/*date={this.state.date}*/}
            {/*onSelect={this.setDate}*/}
          {/*/>*/}
        {/*</Modal>*/}
        {/*<Button onPress={this.setModalVisible}>Show Calendar</Button>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
