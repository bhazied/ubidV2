<?php

namespace ContinuousNet\BiodyXpertBundle\Controller;

use ContinuousNet\BiodyXpertBundle\Entity\TranslationWord;
use ContinuousNet\BiodyXpertBundle\Form\TranslationWordType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Word Controller
 * 
 * Manage TranslationWords 
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
 * @see		TranslationWordController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationword")
 */
class TranslationWordController extends BaseController
{
	/**
	 * Lists all TranslationWord entities.
	 *
	 * @Route("/", name="translationword_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationWords = $em->getRepository('BiodyXpertBundle:TranslationWord')->findAll();

		return $this->render('BiodyXpertBundle:TranslationWord:index.html.twig', array(
			'translationWords' => $translationWords,
		));
	}

	/**
	 * Creates a new TranslationWord entity.
	 *
	 * @Route("/new", name="translationword_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationWord = new TranslationWord();
		$form = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationWordType', $translationWord);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationWord);
			$em->flush();

			return $this->redirectToRoute('translationword_show', array('id' => $translationWord->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationWord:new.html.twig', array(
			'translationWord' => $translationWord,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationWord entity.
	 *
	 * @Route("/{id}", name="translationword_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationWord $translationWord)
	{
		$deleteForm = $this->createDeleteForm($translationWord);

		return $this->render('BiodyXpertBundle:TranslationWord:show.html.twig', array(
			'translationWord' => $translationWord,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationWord entity.
	 *
	 * @Route("/{id}/edit", name="translationword_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationWord $translationWord)
	{
		$deleteForm = $this->createDeleteForm($translationWord);
		$editForm = $this->createForm('ContinuousNet\BiodyXpertBundle\Form\TranslationWordType', $translationWord);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationWord);
			$em->flush();

			return $this->redirectToRoute('translationword_edit', array('id' => $translationWord->getId()));
		}

		return $this->render('BiodyXpertBundle:TranslationWord:edit.html.twig', array(
			'translationWord' => $translationWord,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationWord entity.
	 *
	 * @Route("/{id}", name="translationword_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationWord $translationWord)
	{
		$form = $this->createDeleteForm($translationWord);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationWord);
			$em->flush();
		}

		return $this->redirectToRoute('translationword_index');
	}

	/**
	 * Creates a form to delete a TranslationWord entity.
	 *
	 * @param TranslationWord $translationWord The TranslationWord entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationWord $translationWord)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationword_delete', array('id' => $translationWord->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
