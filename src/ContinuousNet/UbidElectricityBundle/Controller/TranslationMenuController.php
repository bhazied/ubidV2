<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\TranslationMenu;
use ContinuousNet\UbidElectricityBundle\Form\TranslationMenuType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Translation Menu Controller
 * 
 * Manage TranslationMenus 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		TranslationMenuController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/translationmenu")
 */
class TranslationMenuController extends BaseController
{
	/**
	 * Lists all TranslationMenu entities.
	 *
	 * @Route("/", name="translationmenu_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$translationMenus = $em->getRepository('UbidElectricityBundle:TranslationMenu')->findAll();

		return $this->render('UbidElectricityBundle:TranslationMenu:index.html.twig', array(
			'translationMenus' => $translationMenus,
		));
	}

	/**
	 * Creates a new TranslationMenu entity.
	 *
	 * @Route("/new", name="translationmenu_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$translationMenu = new TranslationMenu();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationMenuType', $translationMenu);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationMenu);
			$em->flush();

			return $this->redirectToRoute('translationmenu_show', array('id' => $translationMenu->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationMenu:new.html.twig', array(
			'translationMenu' => $translationMenu,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a TranslationMenu entity.
	 *
	 * @Route("/{id}", name="translationmenu_show")
	 * @Method("GET")
	 */
	public function showAction(TranslationMenu $translationMenu)
	{
		$deleteForm = $this->createDeleteForm($translationMenu);

		return $this->render('UbidElectricityBundle:TranslationMenu:show.html.twig', array(
			'translationMenu' => $translationMenu,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing TranslationMenu entity.
	 *
	 * @Route("/{id}/edit", name="translationmenu_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, TranslationMenu $translationMenu)
	{
		$deleteForm = $this->createDeleteForm($translationMenu);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\TranslationMenuType', $translationMenu);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($translationMenu);
			$em->flush();

			return $this->redirectToRoute('translationmenu_edit', array('id' => $translationMenu->getId()));
		}

		return $this->render('UbidElectricityBundle:TranslationMenu:edit.html.twig', array(
			'translationMenu' => $translationMenu,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a TranslationMenu entity.
	 *
	 * @Route("/{id}", name="translationmenu_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, TranslationMenu $translationMenu)
	{
		$form = $this->createDeleteForm($translationMenu);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($translationMenu);
			$em->flush();
		}

		return $this->redirectToRoute('translationmenu_index');
	}

	/**
	 * Creates a form to delete a TranslationMenu entity.
	 *
	 * @param TranslationMenu $translationMenu The TranslationMenu entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(TranslationMenu $translationMenu)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('translationmenu_delete', array('id' => $translationMenu->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
