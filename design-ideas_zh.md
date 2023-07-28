# 设计思路

## 名称由来

Cicerone - 导游/向导 就像本库的作用一样, 通过高亮实现用户操作指引.


## 多区域高亮

目前世面上的 tour 库([driver.js](https://driverjs.com/)/[introjs](https://introjs.com/)/[bootstraptour](https://bootstraptour.com/))基本都是单区域高亮的设计, 但是在实际的业务场景中, 有时候需要同时高亮多个区域, 所以 cicerone.js 采用了多区域设计.

## 不与某个 DOM 元素强耦合

上述提到的的几个 tour 库, 都是与具体 DOM 元素强耦合的, 这意味着当开发者不能随心所欲的高亮某个区域. 而 cicerone.js 在实现之初就考虑到了这一点, 所以它的高亮区域只取决于具体的数值, 不与 DOM 元素绑定.


