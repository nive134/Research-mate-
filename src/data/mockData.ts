import { Paper, ResearchAlert, UserProfile, Workspace } from '../types';

export const INITIAL_PAPERS: Paper[] = [
  {
    id: 'vit-2020',
    title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale',
    authors: 'Dosovitskiy, A., Beyer, L., Kolesnikov, A., et al.',
    year: 2020,
    journal: 'ICLR 2021',
    citations: '12.4k Citations',
    venue: 'ICLR 2021',
    statusTag: 'Summarized',
    notesCount: 2,
    tags: ['Vision Transformers', 'Attention', 'ImageNet'],
    methodology: 'Applies a standard Transformer directly to images, treating image patches as tokens with minimal modifications.',
    dataset: 'Pre-trained on massive proprietary datasets (JFT-300M) and ImageNet-21k before fine-tuning.',
    keyGaps: 'Requires significantly more data to generalize effectively due to a lack of inductive biases inherent to CNNs.',
    results: 'Achieves state-of-the-art performance on multiple benchmarks when pre-trained sufficiently, with lower computational cost at training.',
    abstract: 'While the Transformer architecture has become the de facto standard for natural language processing tasks, its applications to computer vision remain limited. In vision, attention is either applied in conjunction with convolutional networks, or used to replace certain components of convolutional networks while keeping their overall structure in place. We show that this reliance on CNNs is not necessary and a pure transformer applied directly to sequences of image patches can perform very well on image classification tasks.',
    keyFindings: [
      'Vision Transformers (ViTs) outperform CNNs when trained on large datasets (JFT-300M).',
      'Lacks translational equivariance and locality, requiring large data or heavy regularization.',
      'Training efficiency is substantially higher than ResNet variants at equivalent compute levels.'
    ],
    readProgress: 100,
    lastReadDate: '1 day ago'
  },
  {
    id: 'resnet-2015',
    title: 'Deep Residual Learning for Image Recognition',
    authors: 'He, K., Zhang, X., Ren, S., & Sun, J.',
    year: 2015,
    journal: 'CVPR 2016',
    citations: '180k+ Citations',
    venue: 'CVPR 2016',
    statusTag: 'Used in Draft',
    notesCount: 5,
    tags: ['CNNs', 'Residual Connections', 'Deep Learning'],
    methodology: 'Introduces residual learning framework to ease the training of networks that are substantially deeper than those used previously.',
    dataset: 'Evaluated primarily on ImageNet 2012 (1.28M images) and CIFAR-10.',
    keyGaps: 'Fundamentally relies on local operations; struggles to capture long-range global context without deep stacking.',
    results: 'Won 1st place on ILSVRC 2015. Demonstrates that optimization is easier with residual blocks.',
    abstract: 'Deeper neural networks are more difficult to train. We present a residual learning framework to ease the training of networks that are substantially deeper than those used previously. We explicitly reformulate the layers as learning residual functions with reference to the layer inputs, instead of learning unreferenced functions.',
    keyFindings: [
      'Residual skip connections solve the vanishing gradient problem in very deep networks.',
      'ResNet-152 achieves 3.57% error on ImageNet test set.',
      'High efficiency for local spatial feature extraction.'
    ],
    readProgress: 100,
    lastReadDate: '3 days ago'
  },
  {
    id: 'medical-transformer-2023',
    title: 'Transformer Models in Medical Imaging: A Comprehensive Review',
    authors: 'J. Smith, A. Kumar, L. Chen, M. Gonzalez',
    year: 2023,
    journal: 'Journal of Medical Artificial Intelligence • Vol 4, Issue 2',
    citations: '1,832 Citations',
    venue: 'JMAI',
    statusTag: 'Summarized',
    notesCount: 4,
    tags: ['Medical Imaging', 'ViT', 'Segmentation', 'MRI'],
    methodology: 'Categorizes current medical vision approaches into pure ViTs vs hybrid CNN-Transformer architectures across segmentation and classification.',
    dataset: 'Meta-analysis across BraTS (Brain Tumors), LiTS (Liver Tumors), and chest X-rays.',
    keyGaps: 'High computational requirements, data hunger, and lack of interpretability in high-risk clinical settings.',
    results: 'Hybrid models achieve top segmentation Dice scores (0.89 on BraTS) while retaining local anatomical edge precision.',
    abstract: 'The application of deep learning in medical imaging has historically been dominated by Convolutional Neural Networks (CNNs). However, the recent introduction of Transformer architectures, initially designed for natural language processing, has prompted a paradigm shift. This review provides a comprehensive analysis of Transformer models applied to various medical imaging modalities, including MRI, CT, X-ray, and ultrasound.',
    keyFindings: [
      'Vision Transformers (ViTs) demonstrate competitive or superior performance compared to CNNs in MRI and CT scan segmentation tasks, particularly in identifying irregular tumor boundaries.',
      'The primary limitation remains the high computational cost and the need for massive annotated datasets during the pre-training phase.',
      'Hybrid models (CNN-Transformer architectures) show the most promise for clinical deployment, balancing local feature extraction with global context.'
    ],
    fig1Url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJHAQkbTswndD5FUeXSFzSqoKZwC1l9yZmAfoDudRfWQwwDR-cxvV5CPnmsfERtt8FO6m5kj3D4XPwmKV7lEVKZ4n_9ALgzCGbpAiDYDzBHL4XcKkM39KG9fFjudYuwetGlNK_dxcCvI8fFOgYDR4XQeuml5kKEzl7J0QchexvIyHkgSXIY0JAbDPO_pOJ3rfi4gU_S3BGlxx3btlkQf5h2rt3qODleufdcXohbRhUiANejZZ6fZGQ',
    fig2Url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoXe50iZurylQvevqlZyAkdSrpeIstJcOjqulrBAbSUE4PC0F0Ueg-KeppyLk3n2BPPL8QvFUNnSz9dOchOMM1LPceuyw027VFlZbXHoLnL6N2tR-BSvyKonjUU_tYui19BgbOS3qqulOnTVxZ0hS2OAyNbKIgJLfF7amPINEuTcmEjk5CXVydag9w_Q06S5hf0aypwzoR_hhZrAP-vOaxOYGgnRzsVnbDWZ5GumOCrJETgslhrMC1',
    readProgress: 74,
    lastReadDate: '2 days ago'
  },
  {
    id: 'alignment-problem',
    title: 'The Alignment Problem: Machine Learning and Human Values',
    authors: 'Brian Christian',
    year: 2020,
    journal: 'W. W. Norton & Company',
    citations: '3,410 Citations',
    statusTag: 'Summarized',
    notesCount: 2,
    tags: ['AI Ethics', 'Alignment', 'Value Learning'],
    abstract: 'A foundational exploration of how machine learning models learn human preferences, ethical constraints, and potential misalignments.',
    readProgress: 100,
    lastReadDate: '4 days ago'
  },
  {
    id: 'ai-moral-right',
    title: 'Artificial Intelligence as a Moral Right',
    authors: 'John Danaher',
    year: 2022,
    journal: 'Philosophy & Technology',
    citations: '420 Citations',
    statusTag: 'To Read',
    notesCount: 0,
    tags: ['Philosophy', 'Rights', 'Ethics'],
    abstract: 'Examines ethical arguments surrounding moral status, agency, and rights frameworks for autonomous intelligent agents.',
    readProgress: 0,
    lastReadDate: '5 days ago'
  },
  {
    id: 'bias-computer-systems',
    title: 'Bias in Computer Systems',
    authors: 'Batya Friedman, Helen Nissenbaum',
    year: 1996,
    journal: 'ACM Transactions on Information Systems',
    citations: '2,980 Citations',
    statusTag: 'Used in Draft',
    notesCount: 3,
    tags: ['Algorithmic Bias', 'Sociotechnical', 'ACM'],
    abstract: 'Provides a framework for categorizing pre-existing, technical, and emergent bias in computer software and system architecture.',
    readProgress: 100,
    lastReadDate: '1 week ago'
  }
];

export const RECENT_PAPERS_SUGGESTIONS: Paper[] = [
  {
    id: 'microglia-alzheimer',
    title: "Metabolic reprogramming of microglia in Alzheimer's disease models",
    authors: 'Wang, L., et al.',
    year: 2024,
    journal: 'Cell • Oct 2024',
    impactFactor: 14.5,
    citations: '340 Citations',
    tags: ['Neurodegeneration', 'Microglia'],
    abstract: 'Investigates how microglial metabolic shifts affect amyloid-beta clearance in mouse models of Alzheimer\'s disease.',
    readProgress: 20
  },
  {
    id: 'cortical-circuits',
    title: 'Cortical circuit dynamics underlying predictive coding',
    authors: 'Garcia, M., & Lee, K.',
    year: 2024,
    journal: 'Neuron • Sep 2024',
    impactFactor: 9.8,
    citations: '180 Citations',
    tags: ['Cortical Circuits'],
    abstract: 'Probes top-down feedback projections in visual cortex to uncover the cellular mechanisms of prediction error calculation.',
    readProgress: 0
  },
  {
    id: 'astrocyte-neuron-lactate',
    title: 'A novel pathway for astrocyte-neuron lactate shuttling',
    authors: 'Patel, R., et al.',
    year: 2024,
    journal: 'Science • Nov 2024',
    impactFactor: 32.1,
    citations: '89 Citations',
    tags: ['Astrocytes', 'Metabolism'],
    abstract: 'Identifies a previously unknown membrane transporter critical for astrocyte lactate supply during high-frequency synaptic firing.',
    readProgress: 0
  }
];

export const INITIAL_ALERTS: ResearchAlert[] = [
  {
    id: 'alert-1',
    type: 'trending',
    title: 'Trending in Neuroscience',
    description: 'New pre-print challenges standard model of long-term potentiation.',
    meta: 'bioRxiv • 5h ago',
    timeAgo: '5h ago',
    badgeColor: 'bg-[#ba1a1a]', // error red dot
    read: false
  },
  {
    id: 'alert-2',
    type: 'keyword',
    title: 'Keyword Match: "Microglia"',
    description: '3 new papers published in Nature Communications matching your tracked keywords.',
    meta: 'System Alert • 12h ago',
    timeAgo: '12h ago',
    badgeColor: 'bg-[#001e78]', // tertiary cobalt dot
    read: false
  },
  {
    id: 'alert-3',
    type: 'author',
    title: 'Author Update: S. Dehaene',
    description: 'New review article on conscious access mechanisms published in Trends in Cognitive Sciences.',
    meta: 'Cell Press • 1d ago',
    timeAgo: '1d ago',
    badgeColor: 'bg-[#829e85]',
    read: true
  }
];

export const INITIAL_WORKSPACES: Workspace[] = [
  { id: 'ws-1', name: 'PhD Thesis - AI Ethics', itemCount: 12, folderPath: 'Workspaces > PhD Thesis - AI Ethics > Literature' },
  { id: 'ws-2', name: 'Neuroplasticity Review 2025', itemCount: 8, folderPath: 'Workspaces > Neuroplasticity Review' },
  { id: 'ws-3', name: 'Medical Vision AI Grant Proposal', itemCount: 15, folderPath: 'Workspaces > Medical Vision' }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Dr. Elena Rostova',
  title: 'Postdoctoral Fellow',
  department: 'Cognitive Neuroscience',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRkoOHLfwG29_e0xHdMwVVN44w89VEr5p5vtv19UyGZbySxgd7ZKLssXUNPM-Mon-dsT4XrWoB6Z2yex_KHx5llagTixl21olUJWY0uFH74XRPJz6qLKZgX72Xut5H3NLeXlHQoXIDVVhaKOo-HqG55QmnJ3YxmhsW7qoiYzYJHUEAXJW3Ky4saJxrFcRzbXSQICT5j1TMhgPW_TnkDxTrcJXwvgm15JmrA-4AT8eWsSYfPMCMnrU6',
  institution: 'Stanford University',
  syncActive: true,
  researchInterests: ['Neuroplasticity', 'fMRI Analysis', 'Working Memory', 'Synaptic Mapping'],
  alertSettings: [
    {
      id: 'as-1',
      label: 'Keyword: "Neuromodulation"',
      sublabel: 'Daily digest • High Impact Journals only',
      enabled: true
    },
    {
      id: 'as-2',
      label: 'Author: "S. Dehaene"',
      sublabel: 'Instant notification • Any publication',
      enabled: true
    }
  ],
  preferences: {
    theme: 'Light',
    citationStyle: 'APA 7th',
    privacyLevel: 'Standard Institutional Sync'
  }
};
