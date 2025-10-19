# مشروع السفاريتيللأسماك الطازجة (React with Firebase)

مرحبًا بك في مشروع السفاريتيللأسماك الطازجة، وهو تطبيق React كامل الميزات مصمم لعرض وإدارة منتجات الأسماك الطازجة. يستخدم المشروع Firebase للـ Authentication، Firestore لتخزين البيانات، و Storage لتحميل الصور، بالإضافة إلى Tailwind CSS لتصميم واجهة مستخدم حديثة وجذابة.

## الميزات الرئيسية

*   **عرض المنتجات:** تصفح مجموعة متنوعة من منتجات الأسماك الطازجة ببطاقات عرض تفاعلية.
*   **إدارة المنتجات:** (للمشرفين) إضافة، تعديل، وحذف المنتجات بسهولة.
*   **مصادقة المستخدم:** تسجيل الدخول/التسجيل للمستخدمين مع حماية للمسارات.
*   **تكامل Firebase:** استخدام Firestore، Storage، و Authentication.
*   **تصميم احترافي:** واجهة مستخدم عصرية باستخدام Tailwind CSS مع دعم الوضع الداكن.
*   **تأثيرات بصرية:** أنيميشنز سلسة باستخدام Framer Motion وأيقونات جذابة من Lucide React.
*   **تنبيهات للمستخدم:** رسائل توست سهلة الاستخدام باستخدام React Hot Toast.
*   **تحميل مرئي:** مؤشرات تحميل جذابة باستخدام React Spinners.
*   **متجاوب:** تصميم يتكيف مع مختلف أحجام الشاشات (الجوال والكمبيوتر).
*   **عزل البيانات:** استخدام `projectId` لضمان فصل بيانات المشروع في Firestore و Storage.

## البدء بالمشروع

اتبع الخطوات التالية لتشغيل المشروع على جهازك المحلي.

### المتطلبات الأساسية

*   Node.js (LTS version)
*   npm أو Yarn
*   حساب Firebase ومشروع معد مسبقًا.

### الإعداد

1.  **استنساخ المستودع:**
    bash
    git clone <your-repository-url>
    cd react-project
    

2.  **تثبيت التبعيات:**
    bash
    npm install
    # أو
    yarn install
    

3.  **إعداد متغيرات البيئة:**
    أنشئ ملف `.env` في الجذر المشروع والصق فيه مفاتيح Firebase الخاصة بك.
    **هام:** تأكد من أن قيم المتغيرات تتطابق مع مشروع Firebase الخاص بك.

    env
    REACT_APP_FIREBASE_API_KEY=\"YOUR_API_KEY\"
    REACT_APP_FIREBASE_AUTH_DOMAIN=\"YOUR_AUTH_DOMAIN\"
    REACT_APP_FIREBASE_PROJECT_ID=\"YOUR_PROJECT_ID\"
    REACT_APP_FIREBASE_STORAGE_BUCKET=\"YOUR_STORAGE_BUCKET\"
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID=\"YOUR_MESSAGING_SENDER_ID\"
    REACT_APP_FIREBASE_APP_ID=\"YOUR_APP_ID\"
    REACT_APP_FIREBASE_MEASUREMENT_ID=\"YOUR_MEASUREMENT_ID\"
    
    (ملاحظة: لقد تم توفير قيم افتراضية في `.env` الذي تم إنشاؤه لهذا المشروع، لكن يجب عليك استبدالها بقيم مشروعك الحقيقية).

4.  **تشغيل التطبيق:**
    bash
    npm start
    # أو
    yarn start
    
    سيتم فتح التطبيق في متصفحك على `http://localhost:3000`.

## إعداد قواعد Firebase (Firestore Security Rules)

لضمان عزل البيانات وحمايتها، يوصى بتطبيق قواعد Firestore التالية:

firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to project-specific documents only if authenticated and a member of the project
    match /projects/{projectId}/{document=**} {
      allow read, write: if request.auth != null && exists(/databases/$(database)/documents/projects/$(projectId)/members/$(request.auth.uid));
    }

    // Allow creating a new member for a project upon user sign-up
    // This rule allows a user to write their own member document IF the projectId matches the one used in the app
    match /projects/{projectId}/members/{userId} {
      allow create: if request.auth.uid == userId && projectId == 'react-project-1760890358764-ucivvjfmw'; // Replace with your actual project ID
      allow read, update, delete: if request.auth.uid == userId;
    }

    // Basic read access for unauthenticated users on public data (e.g., product listings without sensitive data)
    // If your products contain sensitive info, restrict this.
    match /publicProducts/{document=**} {
      allow read: if true; // Publicly readable products
    }

    // Default deny for other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

**ملاحظات:**
*   تأكد من استبدال `'react-project-1760890358764-ucivvjfmw'` بمعرف المشروع الفعلي الخاص بك إذا قمت بتغييره.
*   تحقق من أنك تضيف دور `owner` أو أي دور آخر للمستخدم بعد التسجيل في `projects/${projectId}/members/${user.uid}`.

## استخدام المشروع

*   **الصفحة الرئيسية:** تعرض نظرة عامة على التطبيق.
*   **المنتجات:** تعرض قائمة بمنتجات الأسماك المتاحة.
*   **لوحة التحكم:** يمكن للمستخدمين المسجلين (بصلاحيات) إضافة منتجات جديدة أو تعديل المنتجات الموجودة.
*   **تسجيل الدخول/التسجيل:** صفحات للمصادقة.

## البنية


react-project/
├── public/                 # الملفات العامة (HTML، manifest)
├── src/                    # كود مصدر التطبيق
│   ├── assets/             # أصول مثل الصور
│   ├── components/         # مكونات React قابلة لإعادة الاستخدام
│   │   ├── common/         # مكونات عامة (Navbar, Footer)
│   │   └── ...
│   ├── contexts/           # سياقات React (مثل FirebaseContext)
│   ├── hooks/              # خطافات React مخصصة
│   ├── pages/              # مكونات الصفحات الرئيسية
│   ├── services/           # وحدات خدمة (Firebase, Product CRUD)
│   ├── utils/              # أدوات مساعدة (validation)
│   ├── styles/             # أنماط CSS (Tailwind globals)
│   ├── config/             # ملفات التكوين
│   ├── App.js              # المكون الرئيسي للتطبيق
│   ├── index.js            # نقطة دخول التطبيق
│   └── reportWebVitals.js  # تقارير أداء الويب
├── tailwind.config.js      # إعدادات Tailwind CSS
├── .env                    # متغيرات البيئة
├── .gitignore              # ملفات تتجاهلها Git
├── package.json            # معلومات المشروع والتبعيات
└── README.md               # هذا الملف


## المساهمة

نرحب بالمساهمات! يرجى قراءة ملف `CONTRIBUTING.md` (إذا كان موجودًا) للحصول على إرشادات.

## الترخيص

هذا المشروع مرخص بموجب ترخيص MIT.