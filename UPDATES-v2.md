# تحديثات إضافية / Additional Updates

## 📋 التحديثات الجديدة / New Updates

### 1. اللوجو / Logo
**التغيير / Change:**
- ✅ تم تحويل اللوجو من نص إلى صورة
- ✅ موقع الصورة: `assets/logo.png`
- ✅ الحجم الموصى به: 200x50 بكسل (عرض × ارتفاع)
- ✅ الصيغة: PNG بخلفية شفافة

**الكود / Code:**
```html
<img src="assets/logo.png" alt="Logo" id="nav-logo">
```

---

### 2. عداد الإحصائيات المتحرك / Animated Stats Counter
**التغيير / Change:**
- ✅ الأرقام تبدأ من 0 وتتحرك تدريجياً للرقم النهائي
- ✅ مدة التحريك: 2 ثانية
- ✅ تأثير Bounce عند الانتهاء
- ✅ تفعيل تلقائي عند ظهور القسم على الشاشة

**الميزات / Features:**
- Animation starts when section is visible
- Staggered animation (each number starts with slight delay)
- Smooth counting effect
- Maintains + suffix if present
- Bounce effect on completion

**الملف / File:** `js/counter.js`

---

### 3. قسم الخبرات - كروت بتتابع زمني / Experience Timeline Cards
**التصميم / Design:**
- ✅ بطاقات أفقية في شبكة متجاوبة
- ✅ حد علوي ملون (Accent color)
- ✅ التاريخ في شريحة زرقاء
- ✅ محاذاة مركزية للنص
- ✅ تأثير Hover برفع البطاقة

**كما في الصورة 01 / As in Image 01:**
```
┌─────────────────┐
│  2024          │ (Date badge)
│                 │
│ Senior BIM     │ (Title)
│ Manager        │
│                 │
│ Company Name   │ (Company)
│                 │
│ Description... │
└─────────────────┘
```

---

### 4. الدورات التدريبية - لينكات Behance / Training Courses - Behance Links
**التغيير / Change:**
- ✅ كل بطاقة دورة أصبحت لينك قابل للضغط
- ✅ تفتح في تاب جديد
- ✅ تشير إلى صفحة المشروع على Behance

**التحديث في courses.json:**
```json
{
  "title": "Course Name",
  "behanceUrl": "https://www.behance.net/gallery/your-project"
}
```

**ملاحظة / Note:**
- قم بتحديث الروابط بروابط مشاريعك الفعلية على Behance
- النص التوضيحي: "Click on any course to view details on Behance"

---

### 5. قسم البرامج - نص فقط / Software Tools - Text Only
**التغيير / Change:**
- ✅ عرض اسم البرنامج فقط بدون أيقونات أو صور
- ✅ تصميم بسيط ونظيف
- ✅ خلفية رمادية فاتحة
- ✅ حد ملون عند الـ Hover

**كما في الصورة 02 / As in Image 02:**
```
┌────────────┐  ┌────────────┐  ┌────────────┐
│  Autodesk  │  │ Navisworks │  │  AutoCAD   │
│   Revit    │  │            │  │            │
└────────────┘  └────────────┘  └────────────┘
```

**التنسيق / Styling:**
- Font weight: 600
- Background: Light gray
- Border on hover: Accent color
- Centered text

---

### 6. الشهادات الاحترافية - سلايدر / Professional Certifications - Slider
**التغيير / Change:**
- ✅ عرض شهادة واحدة في كل مرة
- ✅ أزرار تنقل (السابق/التالي)
- ✅ نقاط تحكم (Dots navigation)
- ✅ صورة كبيرة للشهادة (200x200)
- ✅ انتقال سلس بين الشهادات

**الميزات / Features:**
- Previous/Next buttons
- Dot indicators
- Smooth slide transition
- Auto-center certification badge
- Large, prominent display

**الأوامر / Controls:**
```javascript
// Navigate to specific certification
goToCert(index)

// Navigate forward/backward
changeCert(+1)  // Next
changeCert(-1)  // Previous
```

---

## 📁 ملفات جديدة / New Files

### js/counter.js
- عداد متحرك للإحصائيات
- Intersection Observer للتفعيل التلقائي
- تأثيرات بصرية عند الانتهاء

---

## 🎨 تحديثات CSS / CSS Updates

### Logo Image
```css
.logo img {
    height: 50px;
    max-width: 200px;
    object-fit: contain;
}
```

### Counter Animation
```css
.stat-number.count-completed {
    animation: bounce 0.5s ease;
}
```

### Certifications Slider
```css
.certifications-slider {
    display: flex;
    transition: transform 0.5s ease-in-out;
}
```

### Tools Text-Only
```css
.tool-item {
    padding: 1rem;
    border: 2px solid transparent;
}
.tool-item:hover {
    border-color: var(--accent);
}
```

---

## ✅ قائمة التحديث / Update Checklist

### ضروري / Essential:
- [ ] إضافة صورة اللوجو في `assets/logo.png`
- [ ] تحديث روابط Behance في `data/en/courses.json`
- [ ] إضافة صور الشهادات في `assets/certifications/`
- [ ] اختبار العداد المتحرك
- [ ] اختبار سلايدر الشهادات
- [ ] اختبار روابط الدورات

### اختياري / Optional:
- [ ] تخصيص مدة التحريك في `counter.js`
- [ ] تخصيص ألوان الحدود
- [ ] إضافة Auto-play للسلايدر

---

## 📸 الصور المطلوبة / Required Images

### 1. Logo
- **المسار / Path:** `assets/logo.png`
- **الحجم / Size:** 200x50 pixels (width × height)
- **الصيغة / Format:** PNG with transparent background
- **الملاحظات / Notes:** يجب أن يكون واضح على خلفية بيضاء

### 2. Certifications
- **المسار / Path:** `assets/certifications/[name].png`
- **الحجم / Size:** 200x200 pixels (square)
- **الصيغة / Format:** PNG with transparent background
- **الملاحظات / Notes:** شعارات الشهادات الرسمية

---

## 🔗 روابط Behance / Behance Links

في ملف `data/en/courses.json`، قم بتحديث:

```json
{
  "title": "BIM Fundamentals for Engineers",
  "behanceUrl": "https://www.behance.net/gallery/123456789/your-project-title"
}
```

**كيفية الحصول على الرابط / How to get the link:**
1. اذهب إلى مشروعك على Behance
2. انسخ الرابط من شريط العنوان
3. الصق في حقل behanceUrl

---

## 🚀 التشغيل / Testing

### اختبار العداد / Test Counter:
1. افتح الصفحة
2. انتقل لقسم Stats
3. شاهد الأرقام تتحرك من 0 إلى القيمة النهائية

### اختبار السلايدر / Test Slider:
1. انتقل لقسم Certifications
2. اضغط على الأسهم للتنقل
3. اضغط على النقاط للانتقال المباشر

### اختبار روابط Behance / Test Behance Links:
1. انتقل لقسم Courses
2. اضغط على أي دورة
3. يجب أن تفتح صفحة Behance في تاب جديد

---

**جميع التحديثات مكتملة! / All Updates Complete!** ✨

الموقع الآن يحتوي على جميع الميزات المطلوبة.

The website now includes all requested features.
