import Nerv from "nervjs";
import Taro, { createSelectorQuery as _createSelectorQuery } from "@tarojs/taro-h5";
import { View } from '@tarojs/components';

export default class EHeader extends Taro.Component {

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
    query.select('.EHeader').boundingClientRect(rect => {
      if (rect) {
        Taro.eventCenter.trigger('ESetHeader', rect);
      }
    }).exec();
  }
  render() {
    return <View className="EHeader">
        {this.props.children}
      </View>;
  }
}