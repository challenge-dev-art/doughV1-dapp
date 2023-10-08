import LogoDough from '../assets/logo_dough.png';
import { __VLS_publicComponent, __VLS_internalComponent, __VLS_componentsOption, __VLS_name } from './LayoutHeader1.vue';

function __VLS_template() {
let __VLS_ctx!: InstanceType<__VLS_PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<__VLS_PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_otherComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption;
let __VLS_own!: __VLS_SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; })>;
let __VLS_localComponents!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
let __VLS_components!: typeof __VLS_localComponents & __VLS_GlobalComponents & typeof __VLS_ctx;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'appHeader'?: boolean; } &
{ 'linkDocs'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_resolvedLocalAndGlobalComponents!: {} &
__VLS_WithComponent<'VRow', typeof __VLS_localComponents, "VRow", "vRow", "v-row"> &
__VLS_WithComponent<'RouterLink', typeof __VLS_localComponents, "RouterLink", "routerLink", "router-link"> &
__VLS_WithComponent<'VImg', typeof __VLS_localComponents, "VImg", "vImg", "v-img"> &
__VLS_WithComponent<'VSpacer', typeof __VLS_localComponents, "VSpacer", "vSpacer", "v-spacer">;
({} as __VLS_IntrinsicElements).div; ({} as __VLS_IntrinsicElements).div;
__VLS_components.VRow; __VLS_components.VRow; __VLS_components.vRow; __VLS_components.vRow; __VLS_components["v-row"]; __VLS_components["v-row"];
// @ts-ignore
[VRow, VRow,];
__VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.RouterLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components.routerLink; __VLS_components["router-link"]; __VLS_components["router-link"]; __VLS_components["router-link"]; __VLS_components["router-link"]; __VLS_components["router-link"]; __VLS_components["router-link"];
// @ts-ignore
[RouterLink, RouterLink, RouterLink, RouterLink, RouterLink, RouterLink,];
__VLS_components.VImg; __VLS_components.VImg; __VLS_components.vImg; __VLS_components.vImg; __VLS_components["v-img"]; __VLS_components["v-img"];
// @ts-ignore
[VImg, VImg,];
__VLS_components.VSpacer; __VLS_components.VSpacer; __VLS_components.vSpacer; __VLS_components.vSpacer; __VLS_components["v-spacer"]; __VLS_components["v-spacer"];
// @ts-ignore
[VSpacer, VSpacer,];
{
const __VLS_0 = ({} as __VLS_IntrinsicElements)["div"];
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, {});
({} as __VLS_IntrinsicElements).div;
({} as __VLS_IntrinsicElements).div;
const __VLS_2 = __VLS_1({ ...{ ...{}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_3 = __VLS_pickFunctionalComponentCtx(__VLS_0, __VLS_2)!;
{
let __VLS_4!: 'VRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VRow : 'vRow' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vRow : 'v-row' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-row'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VRow'];
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({ ...{}, class: ("appHeader"), }));
({} as { VRow: typeof __VLS_4; }).VRow;
({} as { VRow: typeof __VLS_4; }).VRow;
const __VLS_6 = __VLS_5({ ...{ ...{}, class: ("appHeader"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_5));
const __VLS_7 = __VLS_pickFunctionalComponentCtx(__VLS_4, __VLS_6)!;
{
let __VLS_8!: 'RouterLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.RouterLink : 'routerLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.routerLink : 'router-link' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['router-link'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['RouterLink'];
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({ ...{}, to: ("/"), }));
({} as { RouterLink: typeof __VLS_8; }).RouterLink;
({} as { RouterLink: typeof __VLS_8; }).RouterLink;
const __VLS_10 = __VLS_9({ ...{ ...{}, to: ("/"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_11 = __VLS_pickFunctionalComponentCtx(__VLS_8, __VLS_10)!;
{
let __VLS_12!: 'VImg' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VImg : 'vImg' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vImg : 'v-img' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-img'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VImg'];
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({ ...{}, width: ((116)), height: ((23)), src: ((__VLS_ctx.LogoDough)), }));
({} as { VImg: typeof __VLS_12; }).VImg;
({} as { VImg: typeof __VLS_12; }).VImg;
const __VLS_14 = __VLS_13({ ...{ ...{}, width: ((116)), height: ((23)), src: ((__VLS_ctx.LogoDough)), }, }, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_15 = __VLS_pickFunctionalComponentCtx(__VLS_12, __VLS_14)!;
}
(__VLS_11.slots!).default;
}
{
let __VLS_16!: 'VSpacer' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.VSpacer : 'vSpacer' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.vSpacer : 'v-spacer' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['v-spacer'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['VSpacer'];
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({ ...{}, }));
({} as { VSpacer: typeof __VLS_16; }).VSpacer;
({} as { VSpacer: typeof __VLS_16; }).VSpacer;
const __VLS_18 = __VLS_17({ ...{ ...{}, }, }, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_19 = __VLS_pickFunctionalComponentCtx(__VLS_16, __VLS_18)!;
}
{
let __VLS_20!: 'RouterLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.RouterLink : 'routerLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.routerLink : 'router-link' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['router-link'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['RouterLink'];
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({ ...{}, to: ("/"), class: ("linkDocs font-regular text-weight-400 text-size-16px"), }));
({} as { RouterLink: typeof __VLS_20; }).RouterLink;
({} as { RouterLink: typeof __VLS_20; }).RouterLink;
const __VLS_22 = __VLS_21({ ...{ ...{}, to: ("/"), class: ("linkDocs font-regular text-weight-400 text-size-16px"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_23 = __VLS_pickFunctionalComponentCtx(__VLS_20, __VLS_22)!;
(__VLS_23.slots!).default;
}
{
let __VLS_24!: 'RouterLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.RouterLink : 'routerLink' extends keyof typeof __VLS_ctx ? typeof __VLS_ctx.routerLink : 'router-link' extends keyof typeof __VLS_ctx ? (typeof __VLS_ctx)['router-link'] : (typeof __VLS_resolvedLocalAndGlobalComponents)['RouterLink'];
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({ ...{}, to: ("/"), class: ("linkMore font-regular text-weight-400 text-size-16px"), }));
({} as { RouterLink: typeof __VLS_24; }).RouterLink;
({} as { RouterLink: typeof __VLS_24; }).RouterLink;
const __VLS_26 = __VLS_25({ ...{ ...{}, to: ("/"), class: ("linkMore font-regular text-weight-400 text-size-16px"), }, }, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_27 = __VLS_pickFunctionalComponentCtx(__VLS_24, __VLS_26)!;
(__VLS_27.slots!).default;
}
(__VLS_7.slots!).default;
}
(__VLS_3.slots!).default;
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses["appHeader"];
__VLS_styleScopedClasses["linkDocs"];
__VLS_styleScopedClasses["font-regular"];
__VLS_styleScopedClasses["text-weight-400"];
__VLS_styleScopedClasses["text-size-16px"];
__VLS_styleScopedClasses["linkMore"];
__VLS_styleScopedClasses["font-regular"];
__VLS_styleScopedClasses["text-weight-400"];
__VLS_styleScopedClasses["text-size-16px"];
}
var __VLS_slots!: {};
// @ts-ignore
[LogoDough, LogoDough,];
return __VLS_slots;
}
