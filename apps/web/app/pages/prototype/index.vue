<script setup lang="ts">
// PROTOTYPE — головна за мовою peakdesign.com.
// Ритм: темний hero → світлі блоки → одна суцільна темна смуга → світлі
// блоки → спліт із темною половиною → світлий підвал.
// Секції не нумеруються: у референсу номерів немає.
definePageMeta({ layout: "prototype" });
useSeoMeta({ title: "Marmúr — свіжі букети у Львові" });
</script>

<template>
  <div>
    <ProtoHomeHeroSplit />
    <ProtoHomeProductRail />
    <ProtoHomeCategoryMosaic />
    <ProtoHomeFeatured />
    <ProtoHomeWhatsNew />
    <ProtoHomeValues />
    <ProtoHomeManifesto />
    <ProtoHomeVisit />
  </div>
</template>
