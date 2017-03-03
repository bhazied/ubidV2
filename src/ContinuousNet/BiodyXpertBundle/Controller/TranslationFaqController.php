<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationFaq;
use ContinuousNet\BiodyXpertBundle\Form\TranslationFaqType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Faq Controller
 * 
 * Manage TranslationFaqs 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BiodyXpertBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Controller
 * @see		TranslationFaqController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationfaq")
 */
class TranslationFaqController extends BaseController
{
	/**
	 * Lists all TranslationFaq entities.
	 *
	 * @Route("/", name="translationfaq_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationFaqs = $em->getRepository('BiodyXpertBundle:TranslationFaq')->findAll();

		return $this->render('BiodyXpertBundle:TranslationFaq:index.html.twig', array(
			'translationFaqs' => $translationFaqs,
		));
	}

	/**
	 * Creates a new TranslationFaq entity.
	 *
	 * @Route("/new", name="translationfaq_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationFaq = new TranslationFaq();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationFaqType', $translationFaq);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationFaq);
			$em->flush();

			return $this->redirectToRoute('translationfaq_show', array('id' => $translationFaq->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationFaq:new.html.twig', array(
			'translationFaq' => $translationFaq,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationFaq entity.
	 *
	 * @Route("/{id}", name="translationfaq_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationFaq $translationFaq)
	{
		$deleteForm = $this->createDeleteForm($translationFaq);

		return $this->render('BiodyXpertBundle:TranslationFaq:show.html.twig', array(
			'translationFaq' => $translationFaq,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationFaq entity.
	 *
	 * @Route("/{id}/edit", name="translationfaq_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationFaq $translationFaq)
	{
		$deleteForm = $this->createDeleteForm($translationFaq);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationFaqType', $translationFaq);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationFaq);
			$em->flush();

			return $this->redirectToRoute('translationfaq_edit', array('id' => $translationFaq->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationFaq:edit.html.twig', array(
			'translationFaq' => $translationFaq,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationFaq entity.
	 *
	 * @Route("/{id}", name="translationfaq_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationFaq $translationFaq)
	{
		$form = $this->createDeleteForm($translationFaq);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationFaq);
			$em->flush();
		}

		return $this->redirectToRoute('translationfaq_index');
	}

	/**
	 * Creates a form to delete a TranslationFaq entity.
	 *
	 * @param TranslationFaq $translationFaq The TranslationFaq entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationFaq $translationFaq)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationfaq_delete', array('id' => $translationFaq->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
