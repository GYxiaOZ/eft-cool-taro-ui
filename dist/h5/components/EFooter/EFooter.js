import Nerv from "nervjs";
import Taro, { createSelectorQuery as _createSelectorQuery } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';

export default class EFooter extends Taro.Component {

  static options = {
    addGlobalClass: true
  };

  componentDidMount() {
    this.countHeight();
  }

  componentDidUpdate() {
    this.countHeight();
  }

  countHeight() {
    const query = _createSelectorQuery();
    {
      query.in(this);
    }
    query.select('.EFooter').boundingClientRect(rect => {
      if (rect) {
        Taro.eventCenter.trigger('ESetFooter', rect);
      }
    }).exec();
  }

  render() {
    return <View className="EFooter">
        {this.props.children}
      </View>;
  }
}