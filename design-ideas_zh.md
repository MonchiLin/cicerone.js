# 设计思路

## 名称由来

Cicerone - 导游/向导 就像本库的作用一样, 通过高亮实现用户操作指引.

## 场景/区域/导游/Popover

```
Tour guide
└─Stage1
│ └─Focus1
│ └─FocusN
│ └─Popover1
│ └─PopoverN
└─Stage2
│ └─Focus1
│ └─FocusN
│ └─Popover1
│ └─PopoverN
```

在本库的设计理念中

一次完整的**导游**(Tour guide)由若干场景组成.

一个**场景**(Stage)由若干个 Focus 和若干 Popover 组成.

![signle-stage_single_area.jpeg](assets%2Fzh%2Fsignle-stage_single_area.jpeg)

在上图(1)中可以看到, *好物社区* 被高亮了起来, 这部分在设计中被称作 Focus.

同时好物区的介绍/指向箭头/下一步这些描述性信息被称为 Popover.

最终这些 Focus 和 Popover 组成了一个 Area, 在本库中设计中

并且在点击下一步时, *好价* 将会被高亮, 在本库的设计理念中, *好物社区* 和 *好价* 都是场景.


## 多区域高亮

目前世面上的 tour 库([driver.js](https://driverjs.com/)/[introjs](https://introjs.com/)/[bootstraptour](https://bootstraptour.com/))基本都是单区域高亮的设计, 但是在实际的业务场景中, 有时候需要同时高亮多个区域, 所以 cicerone.js 采用了多区域设计.

## 不与某个 DOM 元素强耦合

上述提到的的几个 tour 库, 都是与具体 DOM 元素强耦合的, 这意味着当开发者不能随心所欲的高亮某个区域. 而 cicerone.js 在实现之初就考虑到了这一点, 所以它的高亮区域只取决于具体的数值, 不与 DOM 元素绑定.

## StageCicerone 场景导游

